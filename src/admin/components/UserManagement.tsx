import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, X, Shield, Mail, User, Check, Edit2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../services/auth';
import { useAuditStore } from '../../services/audit';
import { toast } from 'react-hot-toast';

const userSchema = z.object({
  name: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  role: z.enum(['admin', 'manager']),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

type UserForm = z.infer<typeof userSchema>;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager';
  status: 'active' | 'inactive';
}

export default function UserManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user: currentUser } = useAuthStore();
  const { addLog } = useAuditStore();
  
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'مدير النظام',
      email: 'admin@racine.sa',
      role: 'admin',
      status: 'active'
    },
    {
      id: '2',
      name: 'مدير العمليات',
      email: 'manager@racine.sa',
      role: 'manager',
      status: 'active'
    }
  ]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleToggleStatus = async (userId: string) => {
    // Prevent deactivating the last admin
    const activeAdmins = users.filter(u => u.role === 'admin' && u.status === 'active');
    const targetUser = users.find(u => u.id === userId);
    
    if (targetUser?.role === 'admin' && activeAdmins.length <= 1 && targetUser.status === 'active') {
      toast.error('لا يمكن إلغاء تنشيط آخر مدير نظام');
      return;
    }

    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        // Add audit log
        addLog({
          action: 'status_change',
          userId,
          performedBy: currentUser?.id || '',
          details: `تم تغيير حالة المستخدم من ${user.status} إلى ${newStatus}`
        });

        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const onSubmit = async (data: UserForm) => {
    try {
      // Simulate API call
      const newUser: User = {
        id: String(users.length + 1),
        ...data,
        status: 'active'
      };
      
      setUsers([...users, newUser]);
      
      // Add audit log
      addLog({
        action: 'create',
        userId: newUser.id,
        performedBy: currentUser?.id || '',
        details: `تم إنشاء مستخدم جديد: ${newUser.name} (${newUser.role})`
      });

      toast.success('تم إضافة المستخدم بنجاح');
      setShowAddModal(false);
      reset();
    } catch (error) {
      toast.error('حدث خطأ أثناء إضافة المستخدم');
    }
  };

  const onEditSubmit = async (data: UserForm) => {
    if (!selectedUser) return;

    try {
      setUsers(users.map(user => {
        if (user.id === selectedUser.id) {
          // Add audit log
          addLog({
            action: 'update',
            userId: user.id,
            performedBy: currentUser?.id || '',
            details: `تم تحديث بيانات المستخدم: ${user.name}`
          });

          return { ...user, ...data };
        }
        return user;
      }));

      toast.success('تم تحديث بيانات المستخدم بنجاح');
      setShowEditModal(false);
      setSelectedUser(null);
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث بيانات المستخدم');
    }
  };

  return (
    <div className="space-y-6 bg-white rounded-xl p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">إدارة المستخدمين</h3>
        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة مستخدم</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#2B227C]/10 rounded-full flex items-center justify-center">
                <span className="text-[#2B227C] font-medium">{user.name[0]}</span>
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user.role === 'admin' ? 'مدير النظام' : 'مدير العمليات'}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {user.status === 'active' ? 'نشط' : 'غير نشط'}
              </span>
              {currentUser?.role === 'admin' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="p-1 text-gray-500 hover:text-[#2B227C] rounded-lg"
                    title="تعديل"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`p-1 rounded-lg ${
                      user.status === 'active'
                        ? 'text-red-500 hover:text-red-700'
                        : 'text-green-500 hover:text-green-700'
                    }`}
                    title={user.status === 'active' ? 'إلغاء التنشيط' : 'تنشيط'}
                  >
                    <AlertCircle className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">إضافة مستخدم جديد</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الصلاحية<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('role')}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  >
                    <option value="manager">مدير العمليات</option>
                    <option value="admin">مدير النظام</option>
                  </select>
                  <Shield className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور<span className="text-red-500">*</span>
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
                >
                  <Check className="h-4 w-4" />
                  <span>إضافة المستخدم</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">تعديل بيانات المستخدم</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onEditSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('name')}
                    defaultValue={selectedUser.name}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    {...register('email')}
                    defaultValue={selectedUser.email}
                    type="email"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  />
                  <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الصلاحية<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register('role')}
                    defaultValue={selectedUser.role}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  >
                    <option value="manager">مدير العمليات</option>
                    <option value="admin">مدير النظام</option>
                  </select>
                  <Shield className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور الجديدة
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2B227C]"
                  placeholder="اترك فارغاً للاحتفاظ بكلمة المرور الحالية"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-[#2B227C] text-white rounded-lg hover:bg-[#1a1648]"
                >
                  <Check className="h-4 w-4" />
                  <span>حفظ التغييرات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}