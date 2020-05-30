var editor = null;
window.onload = () => {
  editor = monaco.editor.create(document.getElementById("container"), {
    language: document.getElementById("language").value,
    theme: "vs-dark"
  });
};

document.getElementById("submit").addEventListener("click", () => {
  const valeu = document.getElementById("input").value;
  fetch(window.location.origin + "/" + document.getElementById("language").value, {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code: editor.getValue(), input: valeu })
  })
    .then(v => v.json())
    .then(v => alert("value: " + v.stdout));
  console.log(editor.getValue(), valeu);
});

document.getElementById("language").addEventListener("change", () => {
  if (editor) editor.dispose();
  editor = monaco.editor.create(document.getElementById("container"), {
    language: document.getElementById("language").value,
    theme: "vs-dark"
  });
})
