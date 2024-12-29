type Props = {
  status: ServiceStatus;
  lastStatus?: ServiceStatus;
  lastStatusTimestamp?: string;
};

function MoreDetail({ status, lastStatus, lastStatusTimestamp }: Props) {
  const classes = "text-gray-800 text-sm py-1";

  return (
    <>
      {status.status !== "healthy" ? (
        <>
          <p className={classes}>
            <span className="font-bold">Details: </span>
            {status.message}
          </p>
          <p className={classes}>
            For more information on how to resolve this issue, see the{" "}
            <a
              className="text-primary-300 underline"
              href="https://docs.virtru.com/docs/status"
              target="_blank"
            >
              Virtru Status documentation
            </a>
            .
          </p>
        </>
      ) : (
        <p className={classes}>This service is {status.status}</p>
      )}
      {lastStatus && lastStatus.status !== status.status && (
        <p className={`${classes} italic`}>
          <span className="font-semibold">Note:</span> Updated from{" "}
          {lastStatus.status} to {status.status}
          {lastStatusTimestamp && (
            <>
              {" "}
              since snapshot taken at{" "}
              <time dateTime={lastStatusTimestamp}>
                {new Date(lastStatusTimestamp).toLocaleString()}
              </time>
            </>
          )}
          .
        </p>
      )}
    </>
  );
}

export default MoreDetail;
