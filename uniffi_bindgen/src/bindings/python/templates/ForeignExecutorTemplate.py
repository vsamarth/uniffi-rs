# FFI code for the ForeignExecutor type

{{ self.add_import("asyncio") }}

_UNIFFI_RUST_TASK_CALLBACK_SUCCESS = 0
_UNIFFI_RUST_TASK_CALLBACK_CANCELLED = 1
_UNIFFI_FOREIGN_EXECUTOR_CALLBACK_SUCCESS = 0
_UNIFFI_FOREIGN_EXECUTOR_CALLBACK_CANCELED = 1
_UNIFFI_FOREIGN_EXECUTOR_CALLBACK_ERROR = 2

class {{ ffi_converter_name }}:
    _handle_map = UniffiHandleMap()

    @classmethod
    def lower(cls, eventloop):
        if not isinstance(eventloop, asyncio.BaseEventLoop):
            raise TypeError("_uniffi_executor_callback: Expected EventLoop instance")
        return cls._handle_map.new_handle(eventloop)

    @classmethod
    def write(cls, eventloop, buf):
        buf.write_u64(cls.lower(eventloop))

    @classmethod
    def read(cls, buf):
        return cls.lift(buf.read_u64())

    @classmethod
    def lift(cls, value):
        return cls._handle_map.get(value)

@_UNIFFI_FOREIGN_EXECUTOR_CALLBACK_T
def _uniffi_executor_callback(handle, delay, task_ptr, task_data):
    if task_ptr is None:
        {{ ffi_converter_name }}._handle_map.consume_handle(handle)
        return _UNIFFI_FOREIGN_EXECUTOR_CALLBACK_SUCCESS
    else:
        eventloop = {{ ffi_converter_name }}._handle_map.get(handle)
        if eventloop.is_closed():
            return _UNIFFI_FOREIGN_EXECUTOR_CALLBACK_CANCELED

        callback = _UNIFFI_RUST_TASK(task_ptr)
        # FIXME: there's no easy way to get a callback when an eventloop is closed.  This means that
        # if eventloop is called before the `call_soon_threadsafe()` calls are invoked, the call
        # will never happen and we will probably leak a resource.
        if delay == 0:
            # This can be called from any thread, so make sure to use `call_soon_threadsafe'
            eventloop.call_soon_threadsafe(callback, task_data,
                                           _UNIFFI_FOREIGN_EXECUTOR_CALLBACK_SUCCESS)
        else:
            # For delayed tasks, we use `call_soon_threadsafe()` + `call_later()` to make the
            # operation threadsafe
            eventloop.call_soon_threadsafe(eventloop.call_later, delay / 1000.0, callback,
                                           task_data, _UNIFFI_FOREIGN_EXECUTOR_CALLBACK_SUCCESS)
        return _UNIFFI_FOREIGN_EXECUTOR_CALLBACK_SUCCESS

# Register the callback with the scaffolding
{%- match ci.ffi_foreign_executor_callback_set() %}
{%- when Some with (fn) %}
_UniffiLib.{{ fn.name() }}(_uniffi_executor_callback)
{%- when None %}
{#- No foreign executor, we don't set anything #}
{% endmatch %}
