
import React from 'react';

const HowToUse: React.FC = () => (
    <div className="my-6 p-4 bg-gray-900 rounded-lg text-sm text-gray-400">
        <h2 className="text-lg font-semibold text-white mb-2">About This App</h2>
        <p className="mb-2">
            This is a web-based demonstration application designed to visualize sleep data, inspired by the Garmin Connect interface. It showcases a rich user interface and an AI-powered sleep analysis feature.
        </p>
        <p>
            <strong>Please Note:</strong> This application uses pre-loaded mock data and does not connect to or pull live data from any wearable device, including a Garmin watch. It is not a deployable Connect IQ app.
        </p>
    </div>
);

export default HowToUse;
