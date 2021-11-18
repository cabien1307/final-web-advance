import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../store/actions/globalTypes";
import Loading from "./Loading";
import Toast from "./Toast/index";

const Alert = () => {
    const { alert } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div>
            {alert.loading && <Loading />}
            {alert.error && (
                <Toast
                    toast={{
                        title: "Error!!!",
                        type: "error",
                        msg: alert.error,
                        duration: 3000,
                    }}
                    closeToast={() =>
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }
                />
            )}

            {alert.warning && (
                <Toast
                    toast={{
                        title: "Warning!!!",
                        type: "warning",
                        msg: alert.warning,
                        duration: 3000,
                    }}
                    closeToast={() =>
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }
                />
            )}

            {alert.info && (
                <Toast
                    toast={{
                        title: "Info...",
                        type: "info",
                        msg: alert.info,
                        duration: 3000,
                    }}
                    closeToast={() =>
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }
                />
            )}

            {alert.success && (
                <Toast
                    toast={{
                        title: "Success...",
                        type: "success",
                        msg: alert.success,
                        duration: 3000,
                    }}
                    closeToast={() =>
                        dispatch({ type: GLOBALTYPES.ALERT, payload: {} })
                    }
                />
            )}
        </div>
    );
};

export default Alert;
