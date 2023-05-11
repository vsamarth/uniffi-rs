window.SIDEBAR_ITEMS = {"constant":[["CALLBACK_ERROR",""],["CALLBACK_SUCCESS",""],["CALLBACK_UNEXPECTED_ERROR",""],["IDX_CALLBACK_FREE","The method index used by the Drop trait to communicate to the foreign language side that Rust has finished with it, and it can be deleted from the handle map."]],"fn":[["rust_call","Handle a scaffolding calls"],["uniffi_foreign_executor_callback_set","Set the global ForeignExecutorCallback.  This is called by the foreign bindings, normally during initialization."],["uniffi_rustbuffer_alloc","This helper allocates a new byte buffer owned by the Rust code, and returns it to the foreign-language code as a `RustBuffer` struct. Callers must eventually free the resulting buffer, either by explicitly calling [`uniffi_rustbuffer_free`] defined below, or by passing ownership of the buffer back into Rust code."],["uniffi_rustbuffer_free","Free a byte buffer that had previously been passed to the foreign language code."],["uniffi_rustbuffer_from_bytes","This helper copies bytes owned by the foreign-language code into a new byte buffer owned by the Rust code, and returns it as a `RustBuffer` struct. Callers must eventually free the resulting buffer, either by explicitly calling the destructor defined below, or by passing ownership of the buffer back into Rust code."],["uniffi_rustbuffer_reserve","Reserve additional capacity in a byte buffer that had previously been passed to the foreign language code."]],"mod":[["ffidefault","FfiDefault trait"],["foreignbytes",""],["foreigncallbacks","Callback interfaces are traits specified in UDL which can be implemented by foreign languages."],["foreignexecutor","Schedule tasks using a foreign executor."],["rustbuffer",""],["rustcalls","Low-level support for calling rust functions"],["rustfuture","[`RustFuture`] represents a `Future` that can be sent to the foreign code over FFI."]],"struct":[["ForeignBytes","Support for reading a slice of foreign-language-allocated bytes over the FFI."],["ForeignCallbackInternals","Struct to hold a foreign callback."],["ForeignExecutor","Schedule Rust calls using a foreign executor"],["ForeignExecutorHandle","Opaque handle for a foreign task executor."],["RustBuffer","Support for passing an allocated-by-Rust buffer of bytes over the FFI."],["RustCallStatus","Represents the success/error of a rust call"],["RustFuture","Future that the foreign code is awaiting"],["UnexpectedUniFFICallbackError","Used when internal/unexpected error happened when calling a foreign callback, for example when a unknown exception is raised"]],"trait":[["FfiDefault",""]],"type":[["ForeignCallback","ForeignCallback is the Rust representation of a foreign language function. It is the basis for all callbacks interfaces. It is registered exactly once per callback interface, at library start up time. Calling this method is only done by generated objects which mirror callback interfaces objects in the foreign language."],["ForeignExecutorCallback","Callback to schedule a Rust call with a `ForeignExecutor`. The bindings code registers exactly one of these with the Rust code."],["FutureCallback","Callback that we invoke when a `RustFuture` is ready."],["RustTaskCallback","Callback for a Rust task, this is what the foreign executor invokes"]]};