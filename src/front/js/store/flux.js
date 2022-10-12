const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: localStorage.getItem("token") || "",
      // demo: [
      //   {
      //     title: "FIRST",
      //     background: "white",
      //     initial: "white",
      //   },
      //   {
      //     title: "SECOND",
      //     background: "white",
      //     initial: "white",
      //   },
      // ],
    },
    actions: {
      userRegister: async (user) => {
        try {
          let response = await fetch(
            `https://3001-orlandoorop-systemregis-qg1kuzw32gw.ws-us64.gitpod.io/api/user`,
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          if (response.ok) {
            return true;
          }
          return false;
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      Login: async () => {
        try {
          let response = await fetch(
            `https://3001-orlandoorop-systemregis-qg1kuzw32gw.ws-us64.gitpod.io/api/login`,
            {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          if (response.ok) {
            let data = await response.json();
            setStore({token: data.token});
            localStorage.setItem("token", data.token)
            return true
          }
          console.log("todo mal ");
        } catch (error) {
          console.log(`Error: ${error}`);
        }
      },
      logout: () => {
        localStorage.removeItem("token");

        setStore({ token: "" });
      },
    },
  };
};

export default getState;
