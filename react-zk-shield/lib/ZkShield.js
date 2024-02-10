"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZkShield = exports.AuthContext = void 0;
var _Authentication = _interopRequireDefault(require("./Authentication"));
var _react = require("react");
var _o1js = require("o1js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const AuthContext = exports.AuthContext = /*#__PURE__*/(0, _react.createContext)();
const ZkShield = _ref => {
  let {
    validate,
    children
  } = _ref;
  const network = new NetworkWorkerClient();
  const authentication = new _Authentication.default(window.mina, NetworkWorkerClient);
  let [state, setState] = (0, _react.useState)({
    hasWallet: authentication.hasWallet,
    hasBeenSetup: validate ? authentication.hasBeenSetup : true,
    accountExists: authentication.accountExists,
    currentNum: null,
    publicKey: null,
    zkappPublicKey: null,
    creatingTransaction: false,
    o1jsLoaded: authentication.o1jsLoaded,
    showRequestingAccount: false,
    showCreateWallet: false,
    showFundAccount: false,
    showLoadingContracts: false,
    userAddress: null
  });
  let [authState, setAuthState] = (0, _react.useState)({
    userAuthenticated: false,
    userAddress: '',
    firstFetchAccount: false,
    alertAvailable: false,
    alertMessage: '',
    alertNeedsSpinner: false,
    creator: null
  });
  const [userAuthenticated, setUserAuthenticated] = (0, _react.useState)(false);
  const [userAddress, setUserAddress] = (0, _react.useState)('');
  const [firstFetchAccount, setFirstFetchAccount] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    function timeout(seconds) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, seconds * 1000);
      });
    }
    (async () => {
      if (!authentication.loggedIn) {
        if (!state.hasBeenSetup) {
          await timeout(15);
          console.log("loading snarky");
          try {
            const loadedSnarky = await authentication.loadSnarky();
          } catch (e) {
            console.log("error loading snarky", e);
          }
          console.log("loadedSnarky");
          const hasWallet = await authentication.checkForWallet();
          if (!hasWallet) {
            setState({
              ...state,
              hasWallet: false,
              o1jsLoaded: true
            });
            return;
          } else {
            setState({
              ...state,
              hasWallet: true,
              o1jsLoaded: true,
              showRequestingAccount: true
            });
            console.log("has wallet");
          }
          console.log("requesting account");
          const loginResult = await authentication.login();
          console.log("login result", loginResult);
          if (loginResult.error == "user reject") {
            Snackbar("You cancelled connection with Mina wallet!", 1500);
          } else if (loginResult.error == "please create or restore wallet first") {
            console.log("please create or restore wallet first");
            setState({
              ...state,
              showCreateWallet: true,
              hasWallet: true,
              o1jsLoaded: true,
              showRequestingAccount: false
            });
          }
          console.log("checking account");
          const accountExists = await authentication.doesAccountExist();
          if (!accountExists) {
            setState({
              ...state,
              showFundAccount: true,
              showCreateWallet: false,
              hasWallet: true,
              o1jsLoaded: true,
              showRequestingAccount: false
            });
          } else {
            var _authentication$zkCli;
            setState({
              ...state,
              showLoadingContracts: true,
              showFundAccount: false,
              showCreateWallet: false,
              hasWallet: true,
              o1jsLoaded: true,
              showRequestingAccount: false,
              userAddress: true
            });
            const hasBeenSetup = await authentication.setupContracts();
            setUserAuthenticated(true);
            setUserAddress(authentication.address);
            //const hasBeenSetup = authentication.setupBjjPromoteContracts();
            setState({
              ...state,
              hasBeenSetup: hasBeenSetup,
              showLoadingContracts: false,
              showFundAccount: false,
              showCreateWallet: false,
              hasWallet: true,
              o1jsLoaded: true,
              showRequestingAccount: false,
              userAddress: authentication.address,
              authentication: authentication
            });
            console.log('fetching account');
            (_authentication$zkCli = authentication.zkClient) === null || _authentication$zkCli === void 0 || _authentication$zkCli.fetchAccount({
              publicKey: _o1js.PublicKey.fromBase58(authentication.contractAddress)
            });
            console.log('fetching account done');
            setFirstFetchAccount(true);
            setAuthState({
              ...authState,
              userAuthenticated: true,
              userAddress: authentication.address,
              firstFetchAccount: true,
              alertAvailable: true,
              alertMessage: 'Successfully logged in'
            });
            // console.log('fetching storage root');
            // let root = await authentication.zkClient.getNum();
            // console.log("storage root", root.toString());
          }
        }
      }
    })();
  }, []);
  const loginClicked = async () => {
    try {
      const loggedIn = await authentication.login();
      if (loggedIn) {
        Router.push('/dashboard');
      }
    } catch (e) {
      console.log("Login Failed", e.message);
      if (e.message == "user reject") {
        Snackbar("You cancelled connection with Mina wallet!", 1500);
      }
    }
    // const loggedIn = authentication.login();
    // if (authentication.loggedIn) {
    //   Router.push('/dashboard')
    // }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Head, null, /*#__PURE__*/React.createElement("title", null, "Whisper Key"), /*#__PURE__*/React.createElement("link", {
    rel: "icon",
    href: "/assets/favicon.ico"
  })), !state.hasBeenSetup ? /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("div", {
    className: "rankproof-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rankproof-content-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero min-h-screen bg-base-200"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-content text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-md"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-5xl font-bold"
  }, "Getting things ready"), /*#__PURE__*/React.createElement("div", {
    className: "pt-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(!state.o1jsLoaded || state.showRequestingAccount || state.showLoadingContracts ? 'loading-snarky' : ''),
    "data-reveal-delay": "400"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: state.o1jsLoaded ? "none" : "block"
    }
  }, "Loading ", /*#__PURE__*/React.createElement("span", {
    className: "text-color-primary"
  }, "o1js"), "..."), state.hasWallet != null && !state.hasWallet && /*#__PURE__*/React.createElement("div", {
    className: "text-color-warning"
  }, "Could not find a wallet. Install Auro wallet here", /*#__PURE__*/React.createElement("div", {
    className: "pt-4"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-accent",
    href: "https://www.aurowallet.com/",
    target: "_blank",
    rel: "noreferrer"
  }, "Auro wallet"))), state.showRequestingAccount && /*#__PURE__*/React.createElement("div", null, "Requesting account"), state.showCreateWallet && /*#__PURE__*/React.createElement("div", {
    className: "text-color-warning"
  }, "Please create or restore a wallet first!"), state.showFundAccount && /*#__PURE__*/React.createElement("div", {
    className: "text-color-warning"
  }, "Your account does not exist, visit thefaucet to fund your account", /*#__PURE__*/React.createElement("div", {
    className: "pt-4"
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn btn-accent",
    href: "https://faucet.minaprotocol.com/",
    target: "_blank",
    rel: "noreferrer"
  }, "Faucet"))), state.showLoadingContracts && /*#__PURE__*/React.createElement("div", null, "Loading contracts..."))), /*#__PURE__*/React.createElement("div", {
    className: "pt-20"
  }, /*#__PURE__*/React.createElement("span", {
    className: "loading loading-bars loading-lg"
  })))))))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(AuthContext.Provider, {
    value: [authState, setAuthState]
  }, children)));
};
exports.ZkShield = ZkShield;