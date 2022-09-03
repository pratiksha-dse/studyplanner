export default {
  login: (user) => {
    console.log(user);
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify({
        token: user.token,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { name: "",  email: ""},
        };
    }).catch((err)=>{alert(err);});
  },
  register: (user) => {
    console.log(user);
    return fetch("/user/register", {
      method: "post",
      body: JSON.stringify({
        token: user.token,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log(res);
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { name: "",  email: ""},
        };
    }).catch((err)=>{alert(err);});
  },

  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { name: "", email: "" },
        };
    });
  },
  getUserByemail: (email) => {
    return fetch("/user/getuserByemail", {
      method: "post",
      body: JSON.stringify({email: email}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },

};
