import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Plus, Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ student_name: '', amount: '', status: 'due', plan: 'monthly_coaching', notes: '' });

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const data = await base44.entities.Payment.list('-created_date', 100);
    setPayments(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    await base44.entities.Payment.create({
      ...form,
      amount: parseFloat(form.amount),
    });
    setDialogOpen(false);
    setForm({ student_name: '', amount: '', status: 'due', plan: 'monthly_coaching', notes: '' });
    loadPayments();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await base44.entities.Payment.update(id, {
      status: newStatus,
      ...(newStatus === 'paid' ? { paid_date: new Date().toISOString().split('T')[0] } : {}),
    });
    loadPayments();
  };

  const filtered = payments.filter((p) =>
    p.student_name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    paid: 'bg-green-500/20 text-green-400',
    due: 'bg-yellow-500/20 text-yellow-400',
    overdue: 'bg-red-500/20 text-red-400',
    partial: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-4">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-sm font-body text-muted-foreground">Admin Only</span>
        </div>
        <h1 className="font-heading font-bold text-3xl text-foreground">
          Payment <span className="gradient-text">Manager</span>
        </h1>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass border-border/30 text-foreground"
          />
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <GlowButton><Plus className="w-4 h-4" /> Add Payment</GlowButton>
          </DialogTrigger>
          <DialogContent className="glass-strong border-border/30 text-foreground">
            <DialogHeader>
              <DialogTitle className="font-heading gradient-text">New Payment Record</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-sm font-body text-muted-foreground">Student Name</Label>
                <Input value={form.student_name} onChange={(e) => setForm({ ...form, student_name: e.target.value })} className="glass border-border/30 text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-sm font-body text-muted-foreground">Amount ($)</Label>
                <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="glass border-border/30 text-foreground mt-1" />
              </div>
              <div>
                <Label className="text-sm font-body text-muted-foreground">Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="glass border-border/30 text-foreground mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="glass-strong border-border/30">
                    <SelectItem value="due">Due</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-body text-muted-foreground">Plan</Label>
                <Select value={form.plan} onValueChange={(v) => setForm({ ...form, plan: v })}>
                  <SelectTrigger className="glass border-border/30 text-foreground mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent className="glass-strong border-border/30">
                    <SelectItem value="monthly_coaching">Monthly Coaching</SelectItem>
                    <SelectItem value="quarterly_coaching">Quarterly Coaching</SelectItem>
                    <SelectItem value="annual_coaching">Annual Coaching</SelectItem>
                    <SelectItem value="one_time">One-Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-body text-muted-foreground">Notes</Label>
                <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="glass border-border/30 text-foreground mt-1" />
              </div>
              <GlowButton onClick={handleCreate} className="w-full">Create Payment Record</GlowButton>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment list */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      ) : filtered.length === 0 ? (
        <GlassCard hover={false} className="text-center py-12">
          <p className="text-muted-foreground font-body">No payment records found.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((payment, i) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard hover={false} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="font-heading font-semibold text-foreground">{payment.student_name}</div>
                  <div className="text-xs text-muted-foreground font-body">{payment.plan?.replace('_', ' ')}</div>
                  {payment.notes && <div className="text-xs text-muted-foreground font-body mt-1">{payment.notes}</div>}
                </div>
                <div className="font-heading font-bold text-lg gradient-text">${payment.amount}</div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-heading font-semibold px-3 py-1 rounded-full ${statusColors[payment.status]}`}>
                    {payment.status}
                  </span>
                  {payment.status !== 'paid' && (
                    <GlowButton size="sm" onClick={() => handleStatusUpdate(payment.id, 'paid')}>
                      Mark Paid
                    </GlowButton>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}