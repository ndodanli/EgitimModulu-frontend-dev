import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { EMFade } from "../../components/index";

// routes config
import studentRoutes from "../../routes//studentRoutes";
import NotFoundPage from "../../pages/NotFoundPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">LOADING PAGE</div>
  </div>
);

function StudentContent() {
  return (
    <main>
      <Suspense fallback={loading}>
        <Switch>
          {studentRoutes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <EMFade>
                      <route.component {...props} />
                    </EMFade>
                  )}
                />
              )
            );
          })}
          <Route path="/404" component={NotFoundPage} />
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </main>
  );
}

export default React.memo(StudentContent);
