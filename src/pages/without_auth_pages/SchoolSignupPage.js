import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/shared/userActions/accountActions";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";
import {
  emailValidation,
  emptyValidation,
  minLengthValidation,
  passwordValidation,
  strongPasswordValidation,
  telValidation,
} from "../../utilities/form/validation/validationMethods";
import {
  EMButton,
  EMCard,
  EMCardBody,
  EMCol,
  EMContainer,
  EMInputGroup,
  EMInputGroupPrepend,
  EMInputGroupText,
  EMRow,
  EMIcon,
  EMTextArea,
  EMForm,
  EMInput,
  EMButtonToolbar,
  EMCardGroup,
} from "../../components/index";
import { CCardHeader, CHeader } from "@coreui/react";
export const FormContext = React.createContext();
function SchoolSignupPage() {
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { success, error } = userRegister;

  //e gönderildi ancak e.preventDefault() ayarı default olarak yapıldı. formdaki inputları fromInputs ile alıyoruz(keyler inputların name'leri olacak şekilde ayarlandı).
  const handleSubmit = (e, formInputs) => {
    dispatch(registerUser(formInputs));
  };
  useEffect(() => {
    if (success) dispatch(push("/school-login"));
  }, [success]);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <EMContainer>
        <EMRow className="justify-content-center">
          <EMCol md="8">
            <EMCardGroup>
              <EMCard className="text-white bg-primary py-5 ">
                <EMCardBody className="text-center py-5">
                  <div>
                    <h2>Hoş Geldin!</h2>
                    <p>
                      Kurumunu yönetmek için sunduğumuz özelliklere erişebilmek
                      için şimdi <b>Kayıt Ol</b>.
                    </p>
                  </div>
                </EMCardBody>
              </EMCard>

              <EMCard>
                <EMCardBody>
                  <EMForm
                    onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
                    addSchoolId={false}
                  >
                    <h1>Kayıt ol</h1>
                    <p className="text-muted">Kurum hesabınızı oluşturun</p>
                    {error &&
                      error.errors &&
                      error.errors.map((errMessage) => (
                        <div className="is-invalid-text">{errMessage}</div>
                      ))}

                    <EMInputGroup className="mb-3 ">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-user" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      {/*label, name ve type girilmesi zorunlu, gerisi opsiyonel */}
                      <EMInput
                        label="Kullanıcı Adınızı"
                        name="username"
                        type="text"
                        maxLength={20}
                        getOtherInputsOnValidation
                        validationMethods={[emptyValidation]}
                      />
                      {error &&
                        (error.Username
                          ? error.Username.map((errMessage) => (
                              <div className="is-invalid-text">
                                {errMessage}
                              </div>
                            ))
                          : error.usernameExist && (
                              <div
                                className="is-invalid-text"
                                dangerouslySetInnerHTML={{
                                  __html: error.usernameExist,
                                }}
                              ></div>
                            ))}
                    </EMInputGroup>

                    <EMInputGroup className="mb-3 ">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-institution" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      <EMInput
                        label="Kurum Adı"
                        id="name"
                        name="name"
                        type="text"
                        maxLength={30}
                        placeholder="Kurum adınızı giriniz"
                        validationMethods={[emptyValidation]}
                      />
                      {error &&
                        error.Name &&
                        error.Name.map((errMessage) => (
                          <div className="is-invalid-text">{errMessage}</div>
                        ))}
                    </EMInputGroup>

                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-envelope-closed" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <EMInput
                        type="email"
                        placeholder="E-mail adresi"
                        name="emailAddress"
                        label="E-mail adresi"
                        validationMethods={[emptyValidation]}
                      />
                    </EMInputGroup>

                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-lock-locked" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      <EMInput
                        label="Parola"
                        name="password"
                        type="password"
                        placeholder="Parolanızı giriniz"
                        maxLength={20}
                        getOtherInputsOnValidation
                        validationMethods={[
                          emptyValidation,
                          passwordValidation,
                          strongPasswordValidation,
                        ]}
                      />
                      {error &&
                        error.Password &&
                        error.Password.map((errMessage) => (
                          <div className="is-invalid-text">{errMessage}</div>
                        ))}
                    </EMInputGroup>

                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-lock-locked" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      <EMInput
                        label="Parola Tekrarı"
                        name="passwordRepeat"
                        type="password"
                        placeholder="Parolanızı tekrar giriniz"
                        maxLength={20}
                        getOtherInputsOnValidation
                        validationMethods={[
                          emptyValidation,
                          passwordValidation,
                        ]}
                      />
                      {error &&
                        error.PasswordRepeat &&
                        error.PasswordRepeat.map((errMessage) => (
                          <div className="is-invalid-text">{errMessage}</div>
                        ))}
                    </EMInputGroup>

                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-address-book" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      <EMTextArea
                        label="Adres"
                        id="address"
                        name="address"
                        type="address"
                        maxLength={200}
                        placeholder="Adresinizi giriniz"
                        validationMethods={[emptyValidation]}
                      />
                      {error &&
                        error.Address &&
                        error.Address.map((errMessage) => (
                          <div className="is-invalid-text">{errMessage}</div>
                        ))}
                    </EMInputGroup>
                    <EMInputGroup className="mb-3">
                      <EMInputGroupPrepend>
                        <EMInputGroupText>
                          <EMIcon name="cil-phone" />
                        </EMInputGroupText>
                      </EMInputGroupPrepend>
                      <br />
                      <EMInput
                        label="Telefon"
                        id="tel"
                        name="tel"
                        type="tel"
                        maxLength={15}
                        placeholder="(5XX) XXX XX XX"
                        setInputOnValidation
                        validationMethods={[
                          telValidation,
                          (value, label) =>
                            minLengthValidation(15, 10)(value, label),
                          emptyValidation,
                        ]}
                      />
                      {error &&
                        error.Tel &&
                        error.Tel.map((errMessage) => (
                          <div className="is-invalid-text">{errMessage}</div>
                        ))}
                    </EMInputGroup>

                    <EMButtonToolbar justify="end ">
                      <EMButton
                        type="submit"
                        color="primary"
                        aria-pressed="true"
                      >
                        Hesap Oluştur
                      </EMButton>
                    </EMButtonToolbar>
                  </EMForm>
                </EMCardBody>
              </EMCard>
            </EMCardGroup>
          </EMCol>
        </EMRow>
      </EMContainer>
    </div>
  );
}

export default SchoolSignupPage;

{
  /* <div className="c-app c-default-layout flex-row align-items-center">
<EMContainer>
  <EMRow className="justify-content-center">
    <EMCol md="9" lg="7" xl="6">
      <EMCard className="mx-4">
        <EMCardBody className="p-4">
          <EMForm
            onSubmit={(e, formInputs) => handleSubmit(e, formInputs)}
            addSchoolId={false}
          >
            <h1 >Kayıt ol</h1>
            <p className="text-muted">Kurum hesabınızı oluşturun</p>
            {error &&
              error.errors &&
              error.errors.map((errMessage) => (
                <div className="is-invalid-text">{errMessage}</div>
              ))}
            <EMInputGroup className="mb-3">
              <EMInputGroupPrepend>
                <EMInputGroupText>
                  <EMIcon name="cil-user" />
                </EMInputGroupText>
              </EMInputGroupPrepend>
              <br />

              {/*label, name ve type girilmesi zorunlu, gerisi opsiyonel */
}
//               <EMInput
//                 label="Kullanıcı Adı"
//                 name="username"
//                 type="text"
//                 maxLength={20}
//                 getOtherInputsOnValidation
//                 validationMethods={[emptyValidation]}
//               />
//               {error &&
//                 (error.Username
//                   ? error.Username.map((errMessage) => (
//                       <div className="is-invalid-text">{errMessage}</div>
//                     ))
//                   : error.usernameExist && (
//                       <div
//                         className="is-invalid-text"
//                         dangerouslySetInnerHTML={{
//                           __html: error.usernameExist,
//                         }}
//                       ></div>
//                     ))}
//             </EMInputGroup>
//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-envelope-closed" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <EMInput
//                 type="email"
//                 placeholder="E-mail adresi"
//                 name="emailAddress"
//                 label="E-mail adresi"
//                 validationMethods={[emptyValidation]}
//               />
//             </EMInputGroup>
//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-lock-locked" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <br />
//               <EMInput
//                 label="Parola"
//                 name="password"
//                 type="password"
//                 placeholder="Parolanızı giriniz"
//                 maxLength={20}
//                 getOtherInputsOnValidation
//                 validationMethods={[
//                   emptyValidation,
//                   passwordValidation,
//                   strongPasswordValidation,
//                 ]}
//               />
//               {error &&
//                 error.Password &&
//                 error.Password.map((errMessage) => (
//                   <div className="is-invalid-text">{errMessage}</div>
//                 ))}
//             </EMInputGroup>

//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-lock-locked" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <br />
//               <EMInput
//                 label="Parola Tekrarı"
//                 name="passwordRepeat"
//                 type="password"
//                 placeholder="Parolanızı tekrar giriniz"
//                 maxLength={20}
//                 getOtherInputsOnValidation
//                 validationMethods={[emptyValidation, passwordValidation]}
//               />
//               {error &&
//                 error.PasswordRepeat &&
//                 error.PasswordRepeat.map((errMessage) => (
//                   <div className="is-invalid-text">{errMessage}</div>
//                 ))}
//             </EMInputGroup>
//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-address-book" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <br />
//               <EMTextArea
//                 label="Adres"
//                 id="address"
//                 name="address"
//                 type="address"
//                 maxLength={200}
//                 placeholder="Adresinizi giriniz"
//                 validationMethods={[emptyValidation]}
//               />
//               {error &&
//                 error.Address &&
//                 error.Address.map((errMessage) => (
//                   <div className="is-invalid-text">{errMessage}</div>
//                 ))}
//             </EMInputGroup>
//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-phone" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <br />
//               <EMInput
//                 label="Telefon"
//                 id="tel"
//                 name="tel"
//                 type="tel"
//                 maxLength={15}
//                 placeholder="(5XX) XXX XX XX"
//                 setInputOnValidation
//                 validationMethods={[
//                   telValidation,
//                   (value, label) =>
//                     minLengthValidation(15, 10)(value, label),
//                   emptyValidation,
//                 ]}
//               />
//               {error &&
//                 error.Tel &&
//                 error.Tel.map((errMessage) => (
//                   <div className="is-invalid-text">{errMessage}</div>
//                 ))}
//             </EMInputGroup>
//             <EMInputGroup className="mb-3">
//               <EMInputGroupPrepend>
//                 <EMInputGroupText>
//                   <EMIcon name="cil-institution" />
//                 </EMInputGroupText>
//               </EMInputGroupPrepend>
//               <br />
//               <EMInput
//                 label="Kurum Adı"
//                 id="name"
//                 name="name"
//                 type="text"
//                 maxLength={30}
//                 placeholder="Kurum adınızı giriniz"
//                 validationMethods={[emptyValidation]}
//               />
//               {error &&
//                 error.Name &&
//                 error.Name.map((errMessage) => (
//                   <div className="is-invalid-text">{errMessage}</div>
//                 ))}
//             </EMInputGroup>
//             <EMButtonToolbar justify="end ">
//               <EMButton
//                 type="submit"
//                 color="primary"
//                 aria-pressed="true"
//               >
//                 Hesap Oluştur
//               </EMButton>
//               </EMButtonToolbar>
//           </EMForm>
//         </EMCardBody>
//       </EMCard>
//     </EMCol>
//   </EMRow>
// </EMContainer>
// </div> */}
