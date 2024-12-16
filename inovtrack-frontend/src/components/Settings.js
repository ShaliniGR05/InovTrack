import React from 'react';
import './Settings.css';

const SettingsPage = () => {
    return (
        <div className="settings-container">
            {/* Sidebar */}
            <aside className="settings-sidebar">
                <h2>Settings</h2>
                <ul>
                    <li><h3>User Settings</h3></li>
                    <li><a href="#account">My Account</a></li>
                    <li><a href="#privacy-security">Privacy & Security</a></li>
                    <li><a href="#notifications">Notifications</a></li>
                    <li><a href="#connected-apps">Connected Apps</a></li>
                    <li><a href="#devices">Devices</a></li>
                    <li><h3>Payment Settings</h3></li>
                    <li><a href="#billing-payments">Billing & Payments</a></li>
                    <li><h3>App Settings</h3></li>
                    <li><a href="#accessibility">Accessibility</a></li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="settings-content">
                {/* My Account Section */}
                <section id="account">
                    <h2>My Account</h2>
                    <label>Display Name</label>
                    <input type="text" placeholder="Your display name" />
                    <label>Email</label>
                    <input type="email" placeholder="Your email" />
                    <label>Profile Visibility</label>
                    <select>
                        <option>Public</option>
                        <option>Private</option>
                    </select>
                    <button>Download My Data</button>
                </section>

                {/* Privacy & Security Section */}
                <section id="privacy-security">
                    <h2>Privacy & Security</h2>
                    <h3>Change Password</h3>
                    <input type="password" placeholder="New password" />
                    <button>Update Password</button>

                    <h3>Two-Factor Authentication</h3>
                    <button>Enable 2FA</button>

                    <h3>Data Visibility</h3>
                    <label>
                        <input type="checkbox" /> Allow others to see my activity
                    </label>
                    <label>
                        <input type="checkbox" /> Share my profile information with friends
                    </label>
                </section>

                {/* Notifications Section */}
                <section id="notifications">
                    <h2>Notifications</h2>
                    <label>Email Notifications</label>
                    <select>
                        <option>Enabled</option>
                        <option>Disabled</option>
                    </select>
                    <label>Push Notifications</label>
                    <select>
                        <option>Enabled</option>
                        <option>Disabled</option>
                    </select>
                    <label>Notification Schedule</label>
                    <input type="time" />
                </section>

                {/* Connected Apps Section */}
                <section id="connected-apps">
                    <h2>Connected Apps</h2>
                    <p>Manage your connected applications below:</p>
                    <button>Connect New App</button>
                    <div className="app-list">
                        <p>App 1 - <button>Revoke Access</button></p>
                        <p>App 2 - <button>Revoke Access</button></p>
                    </div>
                </section>

                {/* Devices Section */}
                <section id="devices">
                    <h2>Devices</h2>
                    <p>Current logged-in devices:</p>
                    <p>Device 1 - <button>Revoke Access</button></p>
                    <p>Device 2 - <button>Revoke Access</button></p>
                </section>

                {/* Billing & Payments Section */}
                <section id="billing-payments">
                    <h2>Billing & Payments</h2>
                    <label>Payment Methods</label>
                    <button>Add Payment Method</button>
                    <p>Card ending in 1234 - <button>Remove</button></p>
                    <h3>Billing History</h3>
                    <ul>
                        <li>Invoice #12345 - $10</li>
                        <li>Invoice #67890 - $20</li>
                    </ul>
                </section>

                {/* Accessibility Section */}
                <section id="accessibility">
                    <h2>Accessibility</h2>
                    <label>Text Size</label>
                    <select>
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                    <label>Color Contrast</label>
                    <select>
                        <option>Default</option>
                        <option>High Contrast</option>
                    </select>
                    <label>
                        <input type="checkbox" /> Enable Screen Reader Support
                    </label>
                    <label>
                        <input type="checkbox" /> Enable Keyboard Shortcuts
                    </label>
                </section>
            </main>
        </div>
    );
};

export default SettingsPage;
