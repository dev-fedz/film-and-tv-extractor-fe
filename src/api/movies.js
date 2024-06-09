import baseAPI from '@/utils/apiConfig';

export const getSourceList = async (params) => {
  const requestName = window.Urls['userresearch.core:source:list']();
  return baseAPI.get(requestName, { params });
};
export const getMoviesList = async (params) => {
  const requestName = window.Urls['userresearch.core:movies:list']();
  return baseAPI.get(requestName, { params });
};