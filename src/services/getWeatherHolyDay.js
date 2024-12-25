import { ajax } from "../tools/ajax";

export const getWeatherHolyDay = async (optionsRequest) => {
  return await ajax(optionsRequest);
};
