export const calculateDuration = (startDate, endDate) => {
    if (!startDate | !endDate) return "0h";

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffMs = Math.abs(end - start);

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${String(diffHours).padStart(2, '0')}h ${String(diffMinutes).padStart(2, '0')}m`;
};

export const formatDate = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
};

export const formatDateGeneral = (dateString) => {
    if (!dateString) return 'TBA';
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('en-US', {
        day:'numeric',
        month: '2-digit',
        year:'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(date);
};