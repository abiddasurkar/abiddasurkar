import React, { useState, useEffect } from 'react';
import { useUI } from '../context/UIContext';
import apiService from '../services/apiService';

const ConfigEditor = () => {
  const [config, setConfig] = useState({});
  const [originalConfig, setOriginalConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { addNotification } = useUI();

  useEffect(() => {
    fetchConfig();
  }, []);

  useEffect(() => {
    setHasChanges(JSON.stringify(config) !== JSON.stringify(originalConfig));
  }, [config, originalConfig]);

  const fetchConfig = async () => {
    try {
      const response = await apiService.get('/system/config');
      setConfig(response);
      setOriginalConfig(response);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch system configuration'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiService.put('/config', config);
      setOriginalConfig(config);
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Configuration saved successfully. Restart may be required for some changes.'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.error_message || 'Failed to save configuration'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setConfig(originalConfig);
  };

  const handleNestedChange = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleArrayChange = (section, key, values) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: values
      }
    }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Configuration</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Modify system settings and behavior. Some changes may require a restart.
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              disabled={!hasChanges}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset Changes
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Configuration'}
            </button>
          </div>
        </div>
      </div>

      {/* API Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">API Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Application Name
              </label>
              <input
                type="text"
                value={config.api?.app_name || ''}
                onChange={(e) => handleNestedChange('api', 'app_name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Version
              </label>
              <input
                type="text"
                value={config.api?.version || ''}
                onChange={(e) => handleNestedChange('api', 'version', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Environment
              </label>
              <select
                value={config.api?.environment || 'development'}
                onChange={(e) => handleNestedChange('api', 'environment', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="development">Development</option>
                <option value="production">Production</option>
                <option value="staging">Staging</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max List Limit
              </label>
              <input
                type="number"
                min="10"
                max="1000"
                value={config.api?.max_list_limit || 100}
                onChange={(e) => handleNestedChange('api', 'max_list_limit', parseInt(e.target.value) || 100)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Batch Size
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.api?.max_batch_size || 50}
                onChange={(e) => handleNestedChange('api', 'max_batch_size', parseInt(e.target.value) || 50)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.api?.debug || false}
                  onChange={(e) => handleNestedChange('api', 'debug', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Debug Mode</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.api?.enable_docs || false}
                  onChange={(e) => handleNestedChange('api', 'enable_docs', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable API Documentation</span>
              </label>
            </div>
          </div>
        </div>

        {/* CORS Origins */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            CORS Origins (one per line)
          </label>
          <textarea
            value={(config.api?.cors_origins || []).join('\n')}
            onChange={(e) => handleArrayChange('api', 'cors_origins', e.target.value.split('\n').filter(origin => origin.trim()))}
            placeholder="*&#10;https://example.com&#10;http://localhost:3000"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            rows="3"
          />
        </div>
      </div>

      {/* Scanner Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scanner Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scanner Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Default Concurrency
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={config.scanner?.default_concurrency || 10}
                onChange={(e) => handleNestedChange('scanner', 'default_concurrency', parseInt(e.target.value) || 10)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Request Timeout (seconds)
              </label>
              <input
                type="number"
                min="1"
                max="300"
                value={config.scanner?.request_timeout || 15}
                onChange={(e) => handleNestedChange('scanner', 'request_timeout', parseInt(e.target.value) || 15)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Scanner Limits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scanner Limits</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Depth
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={config.scanner_limits?.max_depth || 3}
                onChange={(e) => handleNestedChange('scanner_limits', 'max_depth', parseInt(e.target.value) || 3)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Concurrency
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={config.scanner_limits?.max_concurrency || 50}
                onChange={(e) => handleNestedChange('scanner_limits', 'max_concurrency', parseInt(e.target.value) || 50)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max Timeout (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="600"
                value={config.scanner_limits?.max_timeout || 60}
                onChange={(e) => handleNestedChange('scanner_limits', 'max_timeout', parseInt(e.target.value) || 60)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Max URL Length
              </label>
              <input
                type="number"
                min="100"
                max="10000"
                value={config.scanner_limits?.max_url_length || 2000}
                onChange={(e) => handleNestedChange('scanner_limits', 'max_url_length', parseInt(e.target.value) || 2000)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Redis and Logging */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Redis Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Redis Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Redis URL
              </label>
              <input
                type="text"
                value={config.redis?.url || ''}
                onChange={(e) => handleNestedChange('redis', 'url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="redis://localhost:6379/0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                TTL (seconds)
              </label>
              <input
                type="number"
                min="60"
                max="86400"
                value={config.redis?.ttl || 3600}
                onChange={(e) => handleNestedChange('redis', 'ttl', parseInt(e.target.value) || 3600)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Logging Configuration */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Logging Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Log Level
              </label>
              <select
                value={config.logging?.level || 'INFO'}
                onChange={(e) => handleNestedChange('logging', 'level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="DEBUG">DEBUG</option>
                <option value="INFO">INFO</option>
                <option value="WARNING">WARNING</option>
                <option value="ERROR">ERROR</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.logging?.json_format || false}
                  onChange={(e) => handleNestedChange('logging', 'json_format', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">JSON Format</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      {hasChanges && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Unsaved Changes
              </h3>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                You have unsaved configuration changes. Some changes may require restarting the application to take effect.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const HealthStatus = () => {
  const [health, setHealth] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const { addNotification } = useUI();

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchHealth = async () => {
    try {
      const response = await apiService.get('/health');
      setHealth(response);
      setLastUpdate(new Date());
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to fetch health status'
      });
      setHealth({ status: 'unhealthy' });
    } finally {
      setLoading(false);
    }
  };

  const formatUptime = (seconds) => {
    if (!seconds) return 'N/A';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
    );
  }

  const isHealthy = health.status === 'healthy';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">System Health</h2>
        <button
          onClick={fetchHealth}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Refresh
        </button>
      </div>
      
      {/* Overall Status */}
      <div className="mb-6">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          isHealthy 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
            isHealthy ? 'bg-green-500' : 'bg-red-500'
          }`}></span>
          {isHealthy ? 'System Healthy' : 'System Unhealthy'}
        </div>
      </div>

      {/* System Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uptime</h4>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatUptime(health.uptime_seconds)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Check</h4>
          <p className="text-sm text-gray-900 dark:text-white">
            {formatTimestamp(health.timestamp)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Updated</h4>
          <p className="text-sm text-gray-900 dark:text-white">
            {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Additional Health Details */}
      {health.components && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Component Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(health.components).map(([component, status]) => (
              <div key={component} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded p-3">
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {component.replace('_', ' ')}
                </span>
                <span className={`inline-block w-3 h-3 rounded-full ${
                  status === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error Messages */}
      {health.errors && health.errors.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-red-700 dark:text-red-300 mb-3">Health Issues</h4>
          <div className="space-y-2">
            {health.errors.map((error, index) => (
              <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SystemPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Configure system settings and monitor health status</p>
      </div>
      
      <HealthStatus />
      <ConfigEditor />
    </div>
  );
};

export default SystemPage;