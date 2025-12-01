const Base_Url = "http://localhost:8080/";
const key = "coded-by-ezeh-godwin";

const handlePost = () => {
  // const firstName = "Ezeanwe";
  const title = "restapi set up";
  const email = "ezeanwechigozie@gmail.com";
  const description = "first rest api set up";
  const due_Date = "1997-06-27";
  const priority = "high";
  const status = "active";
  fetch(`${Base_Url}create?key=${key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
