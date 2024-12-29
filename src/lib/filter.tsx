// import logger from "./logger";

/** Filters out hidden items from a data set */
const filterData = (
  fullData: ServicesHealth | null,
  itemsToHide: Components,
): ServicesHealth | null => {
  if (fullData === null) return null;
  if (itemsToHide === null) return fullData;

  const components: Components = {};

  Object.keys(fullData.components).filter((serviceName) => {
    if (itemsToHide[serviceName] === undefined) {
      // logger(`Keeping ${serviceName}`);
      components[serviceName] = fullData.components[serviceName];
    }
  });

  return { status: fullData.status, components };
};

export { filterData };
