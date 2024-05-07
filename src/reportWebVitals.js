const reportWebVitals = onPerformanceEntry => {
	if (onPerformanceEntry && onPerformanceEntry instanceof Function) {
		import('web-vitals').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
			getCLS(onPerformanceEntry);
			getFID(onPerformanceEntry);
			getFCP(onPerformanceEntry);
			getLCP(onPerformanceEntry);
			getTTFB(onPerformanceEntry);
		});
	}
};

export default reportWebVitals;
