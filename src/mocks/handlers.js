import { rest } from "msw";

const baseURL = process.env.REACT_APP_BASE_API_URL?.endsWith("/")
  ? process.env.REACT_APP_BASE_API_URL
  : process.env.REACT_APP_BASE_API_URL
  ? process.env.REACT_APP_BASE_API_URL + "/"
  : "https://react-moments-walk-through-a1aedba484dc.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pk: 1,
        username: "testuser",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 2,
        profile_image:
          "https://your-heroku-app.herokuapp.com/media/profile_images/sample.jpg",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ detail: "Successfully logged out." })
    );
  }),
];
