const apiUrl = localStorage.getItem("apiUrl");
const fetchData = async () => {
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};

fetchData();

const uploadFile = async () => {
  const inputTag = document.querySelector("#fileUpload");
  const form = new FormData();
  const files = [...inputTag.files];
  console.log(files);
  files.forEach((file) => {
    form.append("files", file);
  });
  const response = await fetch(`${apiUrl}/fileUpload`, {
    method: "POST",
    body: form,
  });
};
