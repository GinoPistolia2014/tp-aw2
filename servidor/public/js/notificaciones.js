function showMessage(text, type = "ok") {
  const msg = document.getElementById("mensaje");

  if (!msg) {
  console.warn("Mensaje no mostrado:", text);
  return;
 }

  msg.textContent = text;
  msg.classList.remove("mensaje-oculto");
  msg.style.background = type === "error" ? "#e74c3c" : "#4caf50";
  msg.classList.add("visible");

  setTimeout(() => {
    msg.classList.remove("visible");

    setTimeout(() => {
      msg.classList.add("mensaje-oculto");
    }, 400);
  }, 2000);
};

export default showMessage