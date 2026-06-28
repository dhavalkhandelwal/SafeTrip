import { FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ProfileForm from '../components/profile/ProfileForm';
import DigitalID from '../components/profile/DigitalID';
import { Navigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="page-container">
      <div className="page-inner">
        <div className="page-header">
          <h1><FiUser style={{ color: '#8577f8' }} /> Your Profile</h1>
          <p>Manage your info, emergency contacts, and safety preferences</p>
        </div>

        <div className="profile-layout">
          {/* Digital ID */}
          <div className="profile-id-col">
            <DigitalID />
          </div>

          {/* Profile Form */}
          <div className="profile-form-col">
            <ProfileForm />
          </div>
        </div>
      </div>
    </div>
  );
}
