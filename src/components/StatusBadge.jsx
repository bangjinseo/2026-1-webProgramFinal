import { getStatusTone } from '../lib/pretextLayout.js';

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-badge-${getStatusTone(status)}`}>{status}</span>;
}
