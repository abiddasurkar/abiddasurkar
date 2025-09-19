import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUI } from '../context/UIContext';
import apiService from '../services/apiService';

const ProgressTracker = ({ scan }) => {
  const getStatusSteps = () => {
    const steps = [
      { id: 'queued', label: 'Queued', description: 'Scan is queued for execution' },
      { id: 'running', label: 'Running', description: 'Actively scanning target' },
      { id: 'completed', label: 'Completed', description: 'Scan finished successfully' }
    ];

    if (scan.status === 'failed' || scan.status === 'cancelled') {
      steps.push({ 
        id: scan.status, 
        label: scan.status.charAt(0).toUpperCase() + scan.status.slice(1), 
        description: `Scan was ${scan.status}` 
      });
    }

    return steps;
  };

  const getCurrentStepIndex = () => {
    const statusOrder = ['queued', 'running', 'completed', 'failed', 'cancelled'];
    return statusOrder.indexOf(scan.status);
  };

  const steps = getStatusSteps();
  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scan Progress</h3>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isFailed = scan.status === 'failed' && step.id === 'failed';
          const isCancelled = scan.status === 'cancelled' && step.id === 'cancelled';
          
          return (
            <div key={step.id} className="flex items-start">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent && !isFailed && !isCancelled
                  ? 'bg-blue-500 text-white'
                  : isFailed
                  ? 'bg-red-500 text-white'
                  : isCancelled
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}>
                {isCompleted ? '✓' : isFailed ? '✗' : isCancelled ? '⚠' : index + 1}
              </div>
              
              <div className="ml-4 flex-1">
                <p className={`text-sm font-medium ${
                  isCompleted || isCurrent || isFailed || isCancelled
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {step.description}
                </p>
                
                {isCurrent && scan.status === 'running' && scan.progress !== undefined && (
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(0, Math.min(100, scan.progress || 0))}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {scan.status === 'running' && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700 dark:text-blue-300">Overall Progress</span>
            <span className="font-medium text-blue-900 dark:text-blue-100">
              {scan.progress || 0}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const VulnerabilitiesList = ({ vulnerabilities }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
      high: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
      low: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
      info: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:border-gray-800'
    };
    return colors[severity?.toLowerCase()] || colors.info;
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      critical: '🔴',
      high: '🟠', 
      medium: '🟡',
      low: '🔵',
      info: '🟢'
    };
    return icons[severity?.toLowerCase()] || icons.info;
  };

  if (!vulnerabilities || vulnerabilities.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Vulnerabilities</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🛡️</div>
          <p className="text-gray-500 dark:text-gray-400">No vulnerabilities found yet</p>
        </div>
      </div>
    );
  }

  // Group vulnerabilities by severity
  const groupedVulns = vulnerabilities.reduce((acc, vuln) => {
    const severity = vuln.severity?.toLowerCase() || 'info';
    if (!acc[severity]) acc[severity] = [];
    acc[severity].push(vuln);
    return acc;
  }, {});

  const severityOrder = ['critical', 'high', 'medium', 'low', 'info'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Vulnerabilities</h3>
        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm">
          {vulnerabilities.length} found
        </span>
      </div>
      
      <div className="space-y-4">
        {severityOrder.map(severity => {
          if (!groupedVulns[severity]) return null;
          
          return (
            <div key={severity}>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <span className="mr-2">{getSeverityIcon(severity)}</span>
                {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity ({groupedVulns[severity].length})
              </h4>
              
              {groupedVulns[severity].map((vuln, index) => (
                <div key={`${severity}-${index}`} className={`border-l-4 pl-4 py-3 rounded-r-lg border ${getSeverityColor(severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 dark:text-white">
                        {vuln.title || vuln.name || 'Unnamed Vulnerability'}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {vuln.description || 'No description available'}
                      </p>
                      
                      {vuln.url && (
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                          URL: {vuln.url}
                        </p>
                      )}
                    </div>
                    
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ml-3 ${getSeverityColor(severity)}`}>
                      {severity}
                    </span>
                  </div>
                  
                  {vuln.evidence && (
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Evidence:</p>
                      <pre className="text-xs text-gray-600 dark:text-gray-400 overflow-x-auto whitespace-pre-wrap">
                        {typeof vuln.evidence === 'string' ? vuln.evidence : JSON.stringify(vuln.evidence, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {vuln.recommendation && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Recommendation:</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">{vuln.recommendation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ScanLogs = ({ scanId, isActive }) => {
  const { addNotification } = useUI();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const logEndRef = React.useRef(null);

  useEffect(() => {
    if (isActive) {
      fetchLogs();
      const interval = setInterval(fetchLogs, 5000); // Poll every 5 seconds for active scans
      return () => clearInterval(interval);
    } else {
      fetchLogs(); // Fetch once for completed scans
    }
  }, [scanId, isActive]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await apiService.get(`/api/v1/scans/${scanId}/logs`);
      setLogs(response?.data?.logs || []);
    } catch (error) {
      if (error?.response?.status !== 404) { // Don't show error for 404 (logs not found)
        console.error('Error fetching logs:', error);
      }
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getLogLevelColor = (level) => {
    const colors = {
      ERROR: 'text-red-400',
      WARN: 'text-yellow-400',
      WARNING: 'text-yellow-400',
      INFO: 'text-green-400',
      DEBUG: 'text-blue-400'
    };
    return colors[level?.toUpperCase()] || 'text-green-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Scan Logs</h3>
        {isActive && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        )}
      </div>
      
      <div className="bg-black rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
        {loading && logs.length === 0 ? (
          <div className="text-gray-400 animate-pulse">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-gray-400">
            {isActive ? 'Waiting for log entries...' : 'No logs available for this scan.'}
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="mb-1 hover:bg-gray-900 px-1 rounded">
              <span className="text-gray-500">
                [{log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()}]
              </span>{' '}
              <span className={getLogLevelColor(log.level)}>
                [{log.level || 'INFO'}]
              </span>{' '}
              <span className="text-gray-300">
                {log.message || log.msg || 'No message'}
              </span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
      
      {!loading && logs.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          Showing {logs.length} log entries
        </div>
      )}
    </div>
  );
};

const ActionButtons = ({ scan, onCancel, onDelete, onDownloadReport }) => {
  const [loading, setLoading] = useState({});
  
  const canCancel = ['queued', 'running'].includes(scan.status);
  const canDelete = ['completed', 'failed', 'cancelled'].includes(scan.status);
  const canDownload = scan.status === 'completed';

  const handleAction = async (action, handler) => {
    setLoading(prev => ({ ...prev, [action]: true }));
    try {
      await handler();
    } finally {
      setLoading(prev => ({ ...prev, [action]: false }));
    }
  };

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {canCancel && (
        <button
          onClick={() => handleAction('cancel', onCancel)}
          disabled={loading.cancel}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          {loading.cancel ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Cancelling...</span>
            </>
          ) : (
            <>
              <span>⏹️</span>
              <span>Cancel Scan</span>
            </>
          )}
        </button>
      )}
      
      {canDelete && (
        <button
          onClick={() => handleAction('delete', onDelete)}
          disabled={loading.delete}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          {loading.delete ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Deleting...</span>
            </>
          ) : (
            <>
              <span>🗑️</span>
              <span>Delete Scan</span>
            </>
          )}
        </button>
      )}
      
      {canDownload && (
        <button 
          onClick={() => handleAction('download', onDownloadReport)}
          disabled={loading.download}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          {loading.download ? (
            <>
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <span>📄</span>
              <span>Download Report</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

const ScanDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNotification } = useUI();
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/scan-results');
      return;
    }

    fetchScanDetails();
    
    // Poll for updates if scan is active
    const isActive = () => scan && ['queued', 'running'].includes(scan.status);
    const interval = setInterval(() => {
      if (isActive()) {
        fetchScanDetails();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [id, scan?.status]);

  const fetchScanDetails = async () => {
    try {
      const response = await apiService.get(`/api/v1/scans/${id}`);
      setScan(response?.data);
    } catch (error) {
      console.error('Error fetching scan details:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to fetch scan details'
      });
      
      if (error?.response?.status === 404) {
        navigate('/scan-results');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this scan?')) return;

    try {
      await apiService.post(`/api/v1/scans/${id}/cancel`);
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Scan cancelled successfully'
      });
      await fetchScanDetails(); // Refresh scan data
    } catch (error) {
      console.error('Error cancelling scan:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to cancel scan'
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this scan? This action cannot be undone.')) return;

    try {
      await apiService.delete(`/api/v1/scans/${id}`);
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Scan deleted successfully'
      });
      navigate('/scan-results');
    } catch (error) {
      console.error('Error deleting scan:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to delete scan'
      });
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await apiService.get(`/api/v1/scans/${id}/report`, {
        responseType: 'blob'
      });
      
      const blob = new Blob([response.data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scan-report-${scan.scan_name || scan.target}-${id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      addNotification({
        type: 'success',
        title: 'Success',
        message: 'Report downloaded successfully'
      });
    } catch (error) {
      console.error('Error downloading report:', error);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error?.response?.data?.message || 'Failed to download report'
      });
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scan not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The scan you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate('/scan-results')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Back to Scan Results
        </button>
      </div>
    );
  }

  const isActiveScan = ['queued', 'running'].includes(scan.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {scan.scan_name || 'Unnamed Scan'}
            </h1>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              scan.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
              scan.status === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
              scan.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
              scan.status === 'cancelled' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
            }`}>
              {scan.status}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">{scan.target}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Type: {scan.scan_type} • ID: {scan.scan_id}
          </p>
        </div>
        
        <div className="text-right text-sm text-gray-500 dark:text-gray-400">
          <p>Started: {formatDateTime(scan.created_at)}</p>
          {scan.completed_at && (
            <p>Completed: {formatDateTime(scan.completed_at)}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <ActionButtons 
        scan={scan} 
        onCancel={handleCancel} 
        onDelete={handleDelete}
        onDownloadReport={handleDownloadReport}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProgressTracker scan={scan} />
          <VulnerabilitiesList vulnerabilities={scan.vulnerabilities} />
        </div>
        
        <div className="space-y-6">
          <ScanLogs scanId={id} isActive={isActiveScan} />
          
          {/* Scan Metadata */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Scan Configuration</h3>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Target</p>
                <p className="text-gray-900 dark:text-white font-mono break-all">{scan.target}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Scan Type</p>
                <p className="text-gray-900 dark:text-white capitalize">{scan.scan_type}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Max Depth</p>
                <p className="text-gray-900 dark:text-white">{scan.depth || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Max Pages</p>
                <p className="text-gray-900 dark:text-white">{scan.max_pages || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Threads</p>
                <p className="text-gray-900 dark:text-white">{scan.threads || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Timeout</p>
                <p className="text-gray-900 dark:text-white">{scan.timeout ? `${scan.timeout}s` : 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Progress</p>
                <p className="text-gray-900 dark:text-white">{scan.progress || 0}%</p>
              </div>
              
              <div>
                <p className="text-gray-600 dark:text-gray-400">Vulnerabilities</p>
                <p className="text-gray-900 dark:text-white">{scan.vulnerabilities?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDetailPage;