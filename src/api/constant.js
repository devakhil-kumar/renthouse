export const API_ROUTES = {
  LOGIN: 'login',
  REGISTER: 'register',
  USERDETAIL:'user',
  UPDATE:'updateuser',
  GETOTP:'forgot-password',

    // Add more API routes as needed
  ADD_PROPERTY: 'properties',
  UPDATE_PROPERTY: 'properties',
  DELETE_PROPERTY: 'properties',
  GET_PROPERTIES: 'properties',
  SEARCH_PROPERTIES: 'properties/search',

  ADD_RECENT_SEARCH:'addrecentsearch',
  GET_RECENT_SEARCHES:'getrecentsearches',

  ADD_RECENT_VIEWED_PROPERTY:'addviewedproperty',
  GET_RECENT_VIEWED_PROPERTIES:'getviewedproperties',

  GET_SUGGESTED_PROPERTIES:'getsuggestedproperties',

  GET_FEATURED_PROPERTIES:'getfeaturedproperties',

  ADD_FAVORITE_PROPERTY:'addfavoriteproperty',
  GET_FAVORITE_PROPERTIES:'getfavoriteproperties',
  DELETE_FAVORITE_PROPERTIES:'deletefavproperty',
  GET_FAVORITE_PROPERTIES_Id:'getfavpropertiesId',
  CREATE_NOTIFICATION: '/notifications/create',
  GET_AGENT_NOTIFICATIONS: '/notifications/agent',
  MARK_NOTIFICATION_READ: '/notifications',
  GET_UNREAD_NOTIFICATION_COUNT: '/notifications/agent',
  GET_AGENT_PROPERTIES_COUNT: '/property/count',


  };