import React, { useEffect } from "react";
import { authUser } from "../../../actions/shared/userActions/accountActions";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import {
  EMButton,
  EMCard,
  EMCardBody,
  EMCardGroup,
  EMCol,
  EMContainer,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMRow,
  EMForm,
  EMInput,
  EMIcon,
} from "../../../components/index";
import { Link } from "react-router-dom";
import { Roles } from "../../../constants/shared/rolesEnum";
import { CLEAN_AUTH } from "../../../constants/shared/userConstants";
import { emptyValidation } from "../../../utilities/form/validation/validationMethods";
function SchoolLoginPage() {
  const userDetails = useSelector((state) => state.userDetails);
  const { userInfo, errorAuth } = userDetails;

  const dispatch = useDispatch();
  const handleSubmit = (e, formInputs) => {
    dispatch(authUser(formInputs, Roles.School));
  };
  useEffect(() => {
    //ek kontrol
    if (userInfo?.id !== undefined && userInfo?.id !== null) {
      dispatch(push("/"));
    }
    return () => {
      dispatch({ type: CLEAN_AUTH });
    };
  }, []);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <EMContainer>
        <EMRow className="justify-content-center">
          <EMCol md="8">
            <EMCardGroup>
              <EMCard className="p-4">
                <EMCardBody>
                  <EMForm
                    onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
                  >
                    <h1>Giriş Yap</h1>
                    <p className="text-muted">Kurum hesabınıza giriş yapın</p>
                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-user" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <EMInput
                        label="Kullanıcı Adı"
                        name="username"
                        type="text"
                        cssEffects={false}
                        validationMethods={[emptyValidation]}
                      />
                    </EMInputGroup>
                    <EMInputGroup className="mb-4">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-lock-locked" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <EMInput
                        label="Parola"
                        name="password"
                        type="password"
                        cssEffects={false}
                        validationMethods={[emptyValidation]}
                      />
                    </EMInputGroup>
                    <EMInputGroup className="mb-4">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-lock-locked" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <EMInput
                        label="Kurum Kodu"
                        name="schoolCode"
                        type="text"
                        cssEffects={false}
                        validationMethods={[emptyValidation]}
                      />
                      {errorAuth && errorAuth.errors && (
                        <div className="is-invalid-text">
                          {errorAuth.errors}
                        </div>
                      )}
                    </EMInputGroup>
                    <EMRow>
                      <EMCol xs="6">
                        <EMButton
                          type="submit"
                          color="primary"
                          className="px-4"
                        >
                          Giriş Yap
                        </EMButton>
                      </EMCol>
                      <EMCol xs="6" className="text-right">
                        <EMButton color="link" className="px-0">
                          Parolanı mı unuttun?
                        </EMButton>
                      </EMCol>
                    </EMRow>
                  </EMForm>
                </EMCardBody>
              </EMCard>
              
              <EMCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <EMCardBody className="text-center">
                  <div>
                    <h2>Giriş Yap</h2>
                    <p>
                      Kurumunu yönetmek için sunduğumuz özelliklere erişebilmek
                      için şimdi <b>Giriş yap</b>.
                      <h2>
                        <b>Hesabın yok mu?</b>
                      </h2>
                    </p>
                    <Link to="/school-signup">
                      <EMButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Kayıt ol
                      </EMButton>
                    </Link>
                  </div>
                </EMCardBody>
              </EMCard>
            </EMCardGroup>
          </EMCol>
        </EMRow>
      </EMContainer>
    </div>
  );
}

export default SchoolLoginPage;
