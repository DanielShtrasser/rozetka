import { addStory, addNewMessage, deleteMessages } from "../../store/chatSlice";

export default chatSocketMiddleware =
  (socket) => (storeAPI) => (next) => (action) => {
    const { dispatch, getState } = storeAPI;
    const { type, payload } = action;

    switch (type) {
      case "socket/connect":
        socket.connect(payload.url);

        socket.on("open", () => {
          socket.send(payload.request);
          socket.send(refreshedStory());
        });

        socket.on("message", (response) => {
          const data = JSON.parse(response.data);
          switch (data.Action) {
            case "MessageArrived":
              const message = data.Data;
              dispatch(addNewMessage(message));
              break;

            case "NewMessage":
              const newMessage = data.Data.Message;
              break;

            case "HistoryMessage":
              dispatch(addStory(data));
              break;
            case "RefreshHistory":
              if (data.Success === true) {
              }
              break;
            case "Authorize":
              if (data.Success) {
                console.log("Socket authorized");
              } else {
                console.error("Authorization failed");
              }
              break;
            default:
              console.error(data.ErrorMessage);
          }
        });

        socket.on("close", (data) => {
          console.log("socket closed: ", data);
        });
        break;

      case "socket/disconnect":
        socket.disconnect();
        dispatch(deleteMessages());
        break;

      case "socket/sendedMessage":
        const newMessage = {
          Id: new Date().getUTCMilliseconds(),
          Action: "SendMessage",
          Data: JSON.stringify({ Message: payload, ToUserId: 1 }),
        };
        socket.send(newMessage);
        break;

      default:
        break;
    }

    return next(action);
  };

export function socketConnect() {
  return {
    type: "socket/connect",
    payload: {
      url: "wss://rozetkaweb.ru/chat",
      request: {
        Action: "Authorize",
        Data: JSON.stringify({ Phone: "79654040987" }),
      },
    },
  };
}

export function socketDisconnect() {
  return {
    type: "socket/disconnect",
  };
}

export function refreshedStory() {
  return {
    Id: 1,
    Action: "RefreshHistory",
  };
}

export function sendedMessage(txt) {
  return {
    type: "socket/sendedMessage",
    payload: txt,
  };
}
