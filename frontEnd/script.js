const Base_Url = "http://localhost:8080/";
const key = "coded-by-ezeh-godwin";
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NjU0NDA2MjcsImV4cCI6MTc2NTUyNzAyN30.sWjuxBr-hBAPCVtaX2ymBifuoxX5ofRIPeeSow7HoMg";

const handlePost = () => {
  // const firstName = "Ezeanwe";
  const title = "drizzle set up with jwt token auth 22";
  const email = "ezeanwe@gmail.com";
  const description = "first drizzle set up with docker";
  const due_Date = "2025/12/04";
  const priority = "high";
  const status = "active";
  fetch(`${Base_Url}create?key=${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    body: JSON.stringify({
      // firstName,
      title,
      email,
      description,
      due_Date,
      priority,
      status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// handlePost();

const handleGet = () => {
  const id = 3;
  fetch(`${Base_Url}addColumn`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// handleGet();

const handleUpdate = () => {
  const email = "ezeanwechigozie@gmail.com";
  const address = "chigozie";

  fetch(`${Base_Url}updatePost`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      address,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// handleUpdate();

const handleDelete = () => {
  const id = 3;
  fetch(`${Base_Url}deletePost/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// handleDelete();
