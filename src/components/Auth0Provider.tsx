import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
type Auth0ProviderWithNavigateProps = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate: React.FC<Auth0ProviderWithNavigateProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const domain = "";// add the domain from Auth0 once you create an Auth0 account
  const clientId = "" ; // add the clientID from Auth0
  const redirectUri = "http://localhost:5173/dashboard"; //Make sure this matches with Autho settings

  const onRedirectCallback = (appState?: { returnTo?: string }) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  
  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;