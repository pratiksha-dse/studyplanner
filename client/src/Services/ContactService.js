export default {
    submit: (details) => {
      return fetch("/con/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(details),
      });
    },
  };
  