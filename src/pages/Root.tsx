import { Outlet } from "react-router-dom";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "./root.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root: FC = () => {
  const location = useLocation();
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="app">
        {location.pathname !== "/register" &&
          location.pathname !== "/login" && <Header />}

        <div className="content">
          <ToastContainer />
          <Outlet />
        </div>
        <div className="footer">
          {location.pathname !== "/register" &&
            location.pathname !== "/login" && <Footer />}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Root;
// {
//   "functions": [
//     {
//       "source": "functions",
//       "codebase": "default",
//       "ignore": [
//         "node_modules",
//         ".git",
//         "firebase-debug.log",
//         "firebase-debug.*.log",
//         "*.local"
//       ],
//       "predeploy": [
//         "npm --prefix \"$RESOURCE_DIR\" run build"
//       ]
//     }
//   ],
//   "hosting": {
//     "public": "dist",
//     "ignore": [
//       "firebase.json",
//       "**/.*",
//       "**/node_modules/**"
//     ],
//     "rewrites": [
//       {
//         "source": "**",
//         "destination": "/index.html"
//       }
//     ]
//   }
// }

// +  hosting:channel: Channel URL (project-management-react-a7ee1): https://projec
// t-management-react-a7ee1--preview-name-roq04egm.web.app [expires 2024-07-04 14:5
// 3:30]

// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />

//     <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Vite + React + TS</title>
//   </head>
//   <body>
//     <div id="root"></div>

//     <script type="module" src="/src/main.tsx"></script>
//   </body>
// </html>
