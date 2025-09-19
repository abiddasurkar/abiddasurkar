import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import apiService from '../services/apiService';

const TargetInput = ({ value, onChange, error, scanName, onScanNameChange }) => {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target URL *
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          required
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Enter the target URL to scan (must include protocol)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Scan Name (Optional)
        </label>
        <input
          type="text"
          value={scanName}
          onChange={(e) => onScanNameChange(e.target.value)}
          placeholder="My Security Scan"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Optional name for easier identification
        </p>
      </div>
    </div>
  );
};

const ScanTypeSelector = ({ value, onChange }) => {
  const scanTypes = [
    {
      id: 'basic',
      name: 'Basic Scan',
      description: 'Quick scan for common vulnerabilities',
      duration: '5-15 minutes',
      features: ['Basic vulnerability detection', 'Limited crawling', 'Essential security checks']
    },
    {
      id: 'standard',
      name: 'Standard Scan',
      description: 'Balanced scan with good coverage',
      duration: '15-45 minutes',
      features: ['OWASP Top 10 testing', 'Medium-depth crawling', 'Authentication testing']
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Scan',
      description: 'Full security assessment with detailed analysis',
      duration: '1-3 hours',
      features: ['Complete vulnerability assessment', 'Deep crawling', 'Advanced exploitation tests', 'Detailed reporting']
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Scan Type *
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scanTypes.map((type) => (
          <div
            key={type.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              value === type.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500/50'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
            }`}
            onClick={() => onChange(type.id)}
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">{type.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2">{type.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Duration: {type.duration}</p>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {type.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const CrawlingOptions = ({ config, onChange }) => {
  const updateConfig = (field, value) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Crawling Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Crawl Depth
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={config.depth}
            onChange={(e) => updateConfig('depth', parseInt(e.target.value) || 2)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">How deep to crawl (1-10)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Pages
          </label>
          <input
            type="number"
            min="10"
            max="1000"
            value={config.max_pages}
            onChange={(e) => updateConfig('max_pages', parseInt(e.target.value) || 100)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum pages to crawl</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Threads
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={config.threads}
            onChange={(e) => updateConfig('threads', parseInt(e.target.value) || 20)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Concurrent threads (1-50)</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Concurrent Requests
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={config.concurrent_requests}
            onChange={(e) => updateConfig('concurrent_requests', parseInt(e.target.value) || 5)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Concurrent HTTP requests</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Timeout (seconds)
          </label>
          <input
            type="number"
            min="5"
            max="120"
            value={config.timeout}
            onChange={(e) => updateConfig('timeout', parseInt(e.target.value) || 30)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Request timeout</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            value={config.priority}
            onChange={(e) => updateConfig('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Scan priority in queue</p>
        </div>
      </div>
    </div>
  );
};

const AuthenticationOptions = ({ headers, authTokens, onHeadersChange, onAuthTokensChange }) => {
  const [newHeader, setNewHeader] = useState({ key: '', value: '' });
  const [newToken, setNewToken] = useState({ key: '', value: '' });

  const addHeader = () => {
    if (newHeader.key && newHeader.value) {
      onHeadersChange({ ...headers, [newHeader.key]: newHeader.value });
      setNewHeader({ key: '', value: '' });
    }
  };

  const removeHeader = (key) => {
    const updated = { ...headers };
    delete updated[key];
    onHeadersChange(updated);
  };

  const addAuthToken = () => {
    if (newToken.key && newToken.value) {
      onAuthTokensChange({ ...authTokens, [newToken.key]: newToken.value });
      setNewToken({ key: '', value: '' });
    }
  };

  const removeAuthToken = (key) => {
    const updated = { ...authTokens };
    delete updated[key];
    onAuthTokensChange(updated);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Authentication & Headers</h3>
      
      {/* Custom Headers */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Custom Headers</h4>
        <div className="space-y-2 mb-3">
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded border">
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{key}:</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white flex-1">{value}</span>
              <button
                type="button"
                onClick={() => removeHeader(key)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Header name"
            value={newHeader.key}
            onChange={(e) => setNewHeader({ ...newHeader, key: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Header value"
            value={newHeader.value}
            onChange={(e) => setNewHeader({ ...newHeader, value: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={addHeader}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Auth Tokens */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Authentication Tokens</h4>
        <div className="space-y-2 mb-3">
          {Object.entries(authTokens).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-2 rounded border">
              <span className="text-sm font-mono text-gray-600 dark:text-gray-400">{key}:</span>
              <span className="text-sm font-mono text-gray-900 dark:text-white flex-1">***</span>
              <button
                type="button"
                onClick={() => removeAuthToken(key)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Token name (e.g., 'Authorization')"
            value={newToken.key}
            onChange={(e) => setNewToken({ ...newToken, key: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <input
            type="password"
            placeholder="Token value"
            value={newToken.value}
            onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="button"
            onClick={addAuthToken}
            className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const EvidenceOptions = ({ enabled, maxSize, onEnabledChange, onMaxSizeChange, callbackUrl, onCallbackUrlChange }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-4">
      <h3 className="font-medium text-gray-900 dark:text-white mb-3">Evidence & Notifications</h3>
      
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onEnabledChange(e.target.checked)}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
        />
        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable Evidence Collection</span>
      </label>

      {enabled && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Max Evidence Size (bytes)
          </label>
          <input
            type="number"
            min="1024"
            max="10485760"
            value={maxSize}
            onChange={(e) => onMaxSizeChange(parseInt(e.target.value) || 2097152)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum size for evidence collection (default: 2MB)</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Callback URL (Optional)
        </label>
        <input
          type="url"
          value={callbackUrl}
          onChange={(e) => onCallbackUrlChange(e.target.value)}
          placeholder="https://your-webhook.com/scan-complete"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Webhook URL to notify when scan completes</p>
      </div>
    </div>
  );
};

const ValidationSummary = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
        Please fix the following errors:
      </h3>
      <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

const CreateScanPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form data matching backend ScanConfig schema
  const [formData, setFormData] = useState({
    target: '',
    scan_name: '',
    scan_type: 'comprehensive',
    depth: 2,
    max_pages: 100,
    threads: 20,
    concurrent_requests: 5,
    timeout: 30,
    headers: {},
    auth_tokens: {},
    enable_evidence_collection: true,
    max_evidence_size: 2097152,
    priority: 'normal',
    callback_url: ''
  });
  
  const [errors, setErrors] = useState([]);

  const validateStep1 = () => {
    const newErrors = [];
    
    if (!formData.target) {
      newErrors.push('Target URL is required');
    } else if (!isValidTarget(formData.target)) {
      newErrors.push('Please enter a valid URL with protocol (http:// or https://)');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = [];
    
    if (formData.depth < 1 || formData.depth > 10) {
      newErrors.push('Crawl depth must be between 1 and 10');
    }
    
    if (formData.max_pages < 10 || formData.max_pages > 1000) {
      newErrors.push('Max pages must be between 10 and 1000');
    }
    
    if (formData.threads < 1 || formData.threads > 50) {
      newErrors.push('Threads must be between 1 and 50');
    }
    
    if (formData.concurrent_requests < 1 || formData.concurrent_requests > 20) {
      newErrors.push('Concurrent requests must be between 1 and 20');
    }
    
    if (formData.timeout < 5 || formData.timeout > 120) {
      newErrors.push('Timeout must be between 5 and 120 seconds');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const validateStep3 = () => {
    const newErrors = [];
    
    if (formData.callback_url && !isValidUrl(formData.callback_url)) {
      newErrors.push('Callback URL must be a valid URL if provided');
    }
    
    if (formData.enable_evidence_collection && (formData.max_evidence_size < 1024 || formData.max_evidence_size > 10485760)) {
      newErrors.push('Max evidence size must be between 1KB and 10MB');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const isValidTarget = (target) => {
    try {
      new URL(target);
      return target.startsWith('http://') || target.startsWith('https://');
    } catch {
      return false;
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleNext = () => {
    let isValid = false;
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors([]);
  };

const handleSubmit = async () => {
  if (!validateStep3()) return;
  
  setLoading(true);
  try {
    // Clean up the payload - remove empty fields
    const payload = {
      target: formData.target,
      scan_type: formData.scan_type,
      depth: formData.depth,
      max_pages: formData.max_pages,
      threads: formData.threads,
      concurrent_requests: formData.concurrent_requests,
      timeout: formData.timeout,
      enable_evidence_collection: formData.enable_evidence_collection,
      max_evidence_size: formData.max_evidence_size,
      priority: formData.priority
    };

    // Only include non-empty optional fields
    if (formData.scan_name) payload.scan_name = formData.scan_name;
    if (Object.keys(formData.headers).length > 0) payload.headers = formData.headers;
    if (Object.keys(formData.auth_tokens).length > 0) payload.auth_tokens = formData.auth_tokens;
    if (formData.callback_url) payload.callback_url = formData.callback_url;

    // 👇 response is already the JSON, not response.data
    const response = await apiService.post('/api/v1/scans', payload);

    console.log("Scan creation response:", response); // Debug check

    addNotification({
      type: 'success',
      title: 'Success',
      message: `Scan created successfully (ID: ${response.scan_id})`
    });

    // Fix: use response.scan_id
    navigate(`/scan-detail/${response.scan_id}`);
  } catch (error) {
    console.error('Scan creation error:', error);
    addNotification({
      type: 'error',
      title: 'Error',
      message:
        error.response?.data?.message ||
        error.response?.data?.error_message ||
        error.message ||
        'Failed to create scan'
    });
  } finally {
    setLoading(false);
  }
};

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <TargetInput
              value={formData.target}
              onChange={(value) => setFormData({ ...formData, target: value })}
              error={errors.find(e => e.includes('Target'))}
              scanName={formData.scan_name}
              onScanNameChange={(value) => setFormData({ ...formData, scan_name: value })}
            />
            <ScanTypeSelector
              value={formData.scan_type}
              onChange={(value) => setFormData({ ...formData, scan_type: value })}
            />
            <ValidationSummary errors={errors} />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next: Configure Scan
              </button>
            </div>
          </>
        );
      
      case 2:
        return (
          <>
            <CrawlingOptions
              config={formData}
              onChange={(updates) => setFormData({ ...formData, ...updates })}
            />
            <ValidationSummary errors={errors} />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next: Authentication
              </button>
            </div>
          </>
        );
      
      case 3:
        return (
          <>
            <AuthenticationOptions
              headers={formData.headers}
              authTokens={formData.auth_tokens}
              onHeadersChange={(headers) => setFormData({ ...formData, headers })}
              onAuthTokensChange={(auth_tokens) => setFormData({ ...formData, auth_tokens })}
            />
            <ValidationSummary errors={errors} />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Next: Finalize
              </button>
            </div>
          </>
        );
      
      case 4:
        return (
          <>
            <EvidenceOptions
              enabled={formData.enable_evidence_collection}
              maxSize={formData.max_evidence_size}
              onEnabledChange={(enabled) => setFormData({ ...formData, enable_evidence_collection: enabled })}
              onMaxSizeChange={(size) => setFormData({ ...formData, max_evidence_size: size })}
              callbackUrl={formData.callback_url}
              onCallbackUrlChange={(url) => setFormData({ ...formData, callback_url: url })}
            />
            
            {/* Configuration Review */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Review Scan Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Basic Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Target:</span> {formData.target}</div>
                    {formData.scan_name && <div><span className="font-medium">Name:</span> {formData.scan_name}</div>}
                    <div><span className="font-medium">Type:</span> {formData.scan_type}</div>
                    <div><span className="font-medium">Priority:</span> {formData.priority}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Crawling Settings</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Depth:</span> {formData.depth}</div>
                    <div><span className="font-medium">Max Pages:</span> {formData.max_pages}</div>
                    <div><span className="font-medium">Threads:</span> {formData.threads}</div>
                    <div><span className="font-medium">Concurrent Requests:</span> {formData.concurrent_requests}</div>
                    <div><span className="font-medium">Timeout:</span> {formData.timeout}s</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Authentication</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Custom Headers:</span> {Object.keys(formData.headers).length}</div>
                    <div><span className="font-medium">Auth Tokens:</span> {Object.keys(formData.auth_tokens).length}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Evidence & Notifications</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Evidence Collection:</span> {formData.enable_evidence_collection ? 'Enabled' : 'Disabled'}</div>
                    {formData.enable_evidence_collection && (
                      <div><span className="font-medium">Max Evidence Size:</span> {(formData.max_evidence_size / 1024 / 1024).toFixed(1)}MB</div>
                    )}
                    {formData.callback_url && <div><span className="font-medium">Callback URL:</span> Configured</div>}
                  </div>
                </div>
              </div>
            </div>
            
            <ValidationSummary errors={errors} />
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Scan...
                  </div>
                ) : (
                  'Create Scan'
                )}
              </button>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  const stepTitles = ['Target & Type', 'Configuration', 'Authentication', 'Review & Create'];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Security Scan</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Configure and launch a comprehensive security assessment</p>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  stepNumber === step
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : stepNumber < step
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                }`}>
                  {stepNumber < step ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="mt-2 text-xs text-center text-gray-600 dark:text-gray-400 max-w-20">
                  {stepTitles[stepNumber - 1]}
                </div>
              </div>
              {stepNumber < 4 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  stepNumber < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {renderStep()}
      </div>
      
      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Need help? Check our <a href="/docs" className="text-blue-500 hover:text-blue-600">documentation</a> or contact support.
        </p>
      </div>
    </div>
  );
};

export default CreateScanPage;