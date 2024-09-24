import animation from '../../assets/images/loading.json';
import Lottie from 'react-lottie';

/* Loading komponenti*/
/* Burada loading animation icin Lottie kullanildi */

const LoadingScreen = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="overlay">
            <div className="loading">
                <Lottie
                    options={defaultOptions}
                    height={130}
                    width={130}
                    title={'Loading'}
                />
                <span>Searching Flights...</span>
            </div>
        </div>
    );
};

export default LoadingScreen;