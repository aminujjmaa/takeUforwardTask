import React, { useState } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';

const App = () => {
    const [bannerSettings, setBannerSettings] = useState({
        description: '',
        timer: 10,
        link: '',
        isVisible: false // Default to false, controlled by the Dashboard
    });

    return (
        <div className="container mx-auto p-4">
            <Banner 
                isVisible={bannerSettings.isVisible}
                description={bannerSettings.description}
                timer={bannerSettings.timer}
                link={bannerSettings.link}
            />
            <Dashboard setBannerSettings={setBannerSettings} />
        </div>
    );
};

export default App;
