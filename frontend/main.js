var editor = null;
window.onload = async () => {
  let value = new URLSearchParams(window.location.search)
  let val = ""
  if (value.has("share")) {
    let v = await fetch(window.location.origin + "/share/" + value.get("share")).then(res => res.json())
    val = v.code
    console.log(v)
  }
  editor = monaco.editor.create(document.getElementById("container"), {
    language: document.getElementById("language").value,
    theme: "vs-dark",
    value: val
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

document.getElementById("share").addEventListener("click", () => {
  fetch(window.location.origin + "/save", {
    method: "post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ code: editor.getValue(), language: document.getElementById("language").value })
  })
    .then(v => v.json())
    .then(v => alert("value: " +window.location.origin+ "?share="+v.shortId ));
})