const socket = io();
socket.emit("mensaje", "hola servidor");

socket.on("respuesta", (info) => {
  if (info) {
    socket.emit("productos", "productos en tiempo real");
  }else{
    console.log('error en coneccion')
  }
});
