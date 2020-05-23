var editor = null;
window.onload = () => {
  editor = monaco.editor.create(document.getElementById("container"), {
    language: "c",
    theme: "vs-dark"
  });
};

document.getElementById("submit").addEventListener("click", () => {
  const valeu = document.getElementById("input").value;
  fetch("http://localhost:3000/c", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code: editor.getValue(), input: valeu })
  })
    .then(v => v.json())
    .then(v => alert("value: " + v.stdout));
  console.log(editor.getValue(), valeu);
});
