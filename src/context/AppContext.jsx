import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: {
    name: 'Abid Dasurkar',
    title: 'Senior Frontend Developer',
    email: 'abiddasurkar@gmail.com',
    phone: '+91-8275434589',
    location: 'Pune, India',
    github: 'linkedin.com/in/abiddasurkar'
  },
  theme: 'light',
  loading: false,
  contactForm: {
    name: '',
    email: '',
    message: ''
  }
};

// Action types
export const ActionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LOADING: 'SET_LOADING',
  UPDATE_CONTACT_FORM: 'UPDATE_CONTACT_FORM',
  RESET_CONTACT_FORM: 'RESET_CONTACT_FORM'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.UPDATE_CONTACT_FORM:
      return {
        ...state,
        contactForm: { ...state.contactForm, ...action.payload }
      };
    
    case ActionTypes.RESET_CONTACT_FORM:
      return {
        ...state,
        contactForm: initialState.contactForm
      };
    
    default:
      return state;
  }
};

// Create contexts
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const actions = {
    setTheme: (theme) => dispatch({ type: ActionTypes.SET_THEME, payload: theme }),
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    updateContactForm: (formData) => dispatch({ type: ActionTypes.UPDATE_CONTACT_FORM, payload: formData }),
    resetContactForm: () => dispatch({ type: ActionTypes.RESET_CONTACT_FORM })
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};