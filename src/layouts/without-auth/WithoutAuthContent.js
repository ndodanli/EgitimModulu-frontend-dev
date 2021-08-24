import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { EMContainer, EMFade } from "../../components/index";

// routes config
import withoutAuthRoutes from "../../routes/withoutAuthRoutes";
import NotFoundPage from "../../pages/NotFoundPage";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function WithoutAuthContent() {
  return (
    <main className="c-main">
      <EMContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {withoutAuthRoutes.map((route, idx) => {
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
      </EMContainer>
    </main>
  );
}

export default React.memo(WithoutAuthContent);
