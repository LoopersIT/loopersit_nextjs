'use client';

import { useState, useEffect } from 'react';
import { Trash2, Edit, Save, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

interface Member {
    id: number;
    role: 'leader' | 'member';
    name: string;
    image: string | null;
    designation: string | null;
    linkedin: string | null;
    github: string | null;
    facebook: string | null;
    order: number;
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<{
        role: 'leader' | 'member';
        name: string;
        image: string;
        designation: string;
        linkedin: string;
        github: string;
        facebook: string;
        order: number | string;
    }>({
        role: 'member',
        name: '',
        image: '',
        designation: '',
        linkedin: '',
        github: '',
        facebook: '',
        order: 1,
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/members');
            const data = await res.json();
            setMembers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching members:', error);
            setMembers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await fetch(`/api/members/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            } else {
                await fetch('/api/members', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
            }
            setFormData({ role: 'member', name: '', image: '', designation: '', linkedin: '', github: '', facebook: '', order: 1 });
            setEditingId(null);
            fetchMembers();
        } catch (error) {
            console.error('Error saving member:', error);
        }
    };

    const handleEdit = (member: Member) => {
        setEditingId(member.id);
        setFormData({
            role: member.role,
            name: member.name,
            image: member.image || '',
            designation: member.designation || '',
            linkedin: member.linkedin || '',
            github: member.github || '',
            facebook: member.facebook || '',
            order: member.order,
        });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            await fetch(`/api/members/${id}`, { method: 'DELETE' });
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? 'Edit Member' : 'Add Team Member'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'leader' | 'member' })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="member">Member</option>
                                <option value="leader">Leader</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                        <input
                            type="text"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                        <ImageUploader
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                            <input
                                type="url"
                                value={formData.linkedin}
                                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="https://"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                            <input
                                type="url"
                                value={formData.github}
                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="https://"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                            <input
                                type="url"
                                value={formData.facebook}
                                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                placeholder="https://"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                        <input
                            type="number"
                            value={formData.order || ''}
                            onChange={(e) => setFormData({ ...formData, order: e.target.value === '' ? '' : Number(e.target.value) })}
                            onBlur={(e) => {
                                const num = Number(e.target.value);
                                if (!e.target.value || isNaN(num) || num < 1) {
                                    setFormData({ ...formData, order: 1 });
                                }
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            min="1"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button type="submit" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            <Save size={18} />{editingId ? 'Update' : 'Add'} Member
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setFormData({ role: 'member', name: '', image: '', designation: '', linkedin: '', github: '', facebook: '', order: 1 }); }} className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                                <X size={18} />Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Members List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                        {member.image && <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                                <span className={`px-2 py-1 text-xs rounded ${member.role === 'leader' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {member.role}
                                </span>
                            </div>
                            {member.designation && <p className="text-sm text-gray-600 mb-2">{member.designation}</p>}
                            <div className="flex gap-2 mb-3">
                                {member.linkedin && <a href={member.linkedin} target="_blank" className="text-xs text-blue-600 hover:underline">LinkedIn</a>}
                                {member.github && <a href={member.github} target="_blank" className="text-xs text-gray-700 hover:underline">GitHub</a>}
                                {member.facebook && <a href={member.facebook} target="_blank" className="text-xs text-blue-500 hover:underline">Facebook</a>}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(member)} className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                                    <Edit size={14} className="inline mr-1" />Edit
                                </button>
                                <button onClick={() => handleDelete(member.id)} className="flex-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100">
                                    <Trash2 size={14} className="inline mr-1" />Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
