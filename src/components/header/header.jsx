import React, { useState, useEffect } from 'react';
import { Building2, Settings, Upload } from 'lucide-react';
import './header.css';

const Header = ({ activeTab, setActiveTab, businessInfo }) => {
  const [headerColor, setHeaderColor] = useState('blue');
  const [openHeaderSettings, setOpenHeaderSettings] = useState(false);
  const [customHeaderIcon, setCustomHeaderIcon] = useState(null); // Store as base64 or URL

  const headerColorOptions = [
    { name: 'Blue', value: 'blue', cssClass: 'color-blue' },
    { name: 'Red', value: 'red', cssClass: 'color-red' },
    { name: 'Green', value: 'green', cssClass: 'color-green' },
    { name: 'Purple', value: 'purple', cssClass: 'color-purple' },
    { name: 'Orange', value: 'orange', cssClass: 'color-orange' },
    { name: 'Teal', value: 'teal', cssClass: 'color-teal' },
    { name: 'Pink', value: 'pink', cssClass: 'color-pink' },
    { name: 'Indigo', value: 'indigo', cssClass: 'color-indigo' },
    { name: 'Gray', value: 'gray', cssClass: 'color-gray' },
    { name: 'Yellow', value: 'yellow', cssClass: 'color-yellow' },
  ];

  const weatherCodeMap = {
    0: { label: 'Clear sky', icon: '☀️' },
    1: { label: 'Mainly clear', icon: '🌤️' },
    2: { label: 'Partly cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Foggy', icon: '🌫️' },
    48: { label: 'Rime fog', icon: '🌫️' },
    51: { label: 'Light drizzle', icon: '🌦️' },
    53: { label: 'Drizzle', icon: '🌦️' },
    55: { label: 'Heavy drizzle', icon: '🌧️' },
    61: { label: 'Light rain', icon: '🌦️' },
    63: { label: 'Rain', icon: '🌧️' },
    65: { label: 'Heavy rain', icon: '🌧️' },
    71: { label: 'Snow', icon: '❄️' },
    80: { label: 'Rain showers', icon: '🌧️' },
    95: { label: 'Thunderstorm', icon: '⛈️' },
  };

  const extractZipFromAddress = (address) => {
    const match = String(address || '').match(/\b\d{5}\b/);
    return match ? match[0] : null;
  };

  const [weather, setWeather] = useState({ temperature: null, description: '', icon: '', location: '' });
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    const zip = extractZipFromAddress(businessInfo?.address);
    if (!zip) {
      setWeather({ temperature: null, description: '', icon: '', location: '' });
      return;
    }

    let cancelled = false;

    const fetchWeather = async () => {
      setIsWeatherLoading(true);
      setWeatherError(null);
      try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1&language=en&format=json`);
        const geoData = await geoRes.json();
        if (!geoData?.results?.length) throw new Error('Location not found');
        const { latitude, longitude, name, admin1 } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`,
        );
        const weatherData = await weatherRes.json();
        const temperature = weatherData?.current?.temperature_2m ?? null;
        const code = weatherData?.current?.weather_code ?? 0;
        const meta = weatherCodeMap[code] || { label: 'Conditions', icon: '🌤️' };

        if (!cancelled) {
          setWeather({
            temperature: temperature != null ? Math.round(temperature) : null,
            description: meta.label,
            icon: meta.icon,
            location: name ? `${name}${admin1 ? `, ${admin1}` : ''}` : '',
          });
        }
      } catch (err) {
        if (!cancelled) {
          setWeatherError('Weather unavailable');
          setWeather((prev) => ({ ...prev, temperature: null, description: '', icon: '' }));
        }
      } finally {
        if (!cancelled) setIsWeatherLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [businessInfo?.address]);

  // Close header settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openHeaderSettings && !event.target.closest('button[aria-label="Header settings"]') && !event.target.closest('.absolute')) {
        setOpenHeaderSettings(false);
      }
    };
    if (openHeaderSettings) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [openHeaderSettings]);

  return (
    <>
      {/* Header and Navigation */}
      <div className={`header-container ${headerColor}`}>
        <div className="header-inner">
          <div className="header-content">
            <div className="header-logo-section">
              <div className="logo-container">
                {customHeaderIcon ? (
                  <img 
                    src={customHeaderIcon} 
                    alt="Business logo" 
                    className="logo-image"
                  />
                ) : (
                <Building2 className="logo-icon" />
                )}
              </div>
            <div className="header-title-section">
                <h1 className="header-title">Holy City Clean Co.</h1>
                <p className="header-subtitle">Customer Relationship Management</p>
            </div>
              </div>
            <div className="header-actions">
              <div className="info-card">
                <p className="info-label">Today's Date</p>
                <p className="info-value">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="info-card">
                <p className="info-label">
                  Weather {weather.location ? `(${weather.location})` : ''}
                </p>
                {isWeatherLoading ? (
                  <p className="weather-loading">Loading…</p>
                ) : weather.temperature != null ? (
                  <div className="weather-display">
                    <span className="weather-icon" role="img" aria-label={weather.description}>
                      {weather.icon}
                    </span>
                    <span className="weather-temp">{weather.temperature}°F</span>
                    <span className="weather-desc">{weather.description}</span>
                  </div>
                ) : (
                  <p className="weather-error">{weatherError || 'Unavailable'}</p>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenHeaderSettings(!openHeaderSettings)}
                  className="settings-button"
                  aria-label="Header settings"
                >
                  <Settings className="settings-icon" />
                </button>
                {openHeaderSettings && (
                  <div className="settings-dropdown">
                    <div className="settings-dropdown-content">
                      <div>
                      <h3 className="settings-section-title">Header Color</h3>
                      <div className="color-grid">
                        {headerColorOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              setHeaderColor(option.value);
                            }}
                            className={`color-button ${option.cssClass} ${headerColor === option.value ? 'selected' : ''}`}
                            aria-label={`Select ${option.name} color`}
                            title={option.name}
                          />
                        ))}
                      </div>
                    </div>
                      
                      <div className="settings-divider">
                        <h3 className="settings-section-title">Business Icon</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {customHeaderIcon && (
                            <div className="icon-preview">
                              <img 
                                src={customHeaderIcon} 
                                alt="Current business icon" 
                                className="icon-preview-image"
                              />
                  </div>
                )}
                          <label className="icon-upload-label">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setCustomHeaderIcon(reader.result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="icon-upload-input"
                            />
                            <span className="icon-upload-button">
                              <Upload className="icon-upload-icon" />
                              {customHeaderIcon ? 'Change Icon' : 'Upload Custom Icon'}
                            </span>
                          </label>
                          {customHeaderIcon && (
                            <button
                              type="button"
                              onClick={() => setCustomHeaderIcon(null)}
                              className="remove-icon-button"
                            >
                              Remove Custom Icon
                            </button>
                          )}
              </div>
            </div>
          </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <nav className="header-nav">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'leads', label: 'Leads' },
              { id: 'customers', label: 'Customer Directory' },
              { id: 'aiAgent', label: 'My Agent' },
              { id: 'calendar', label: 'Calendar' },
              { id: 'business', label: 'My Business' },
              { id: 'pricingTool', label: 'Pricing Tool' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-button ${isActive ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        </div>
    </>
  );
};

export default Header;
