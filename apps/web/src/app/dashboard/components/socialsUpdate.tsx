'use client';
import { Button } from '@lf/ui/components/base/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@lf/ui/components/base/dialog';
import { Globe, Link2, Pencil, Plus, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import SocialsForm from '../forms/socialsForm';
import { iconMap } from '../utils/iconMap';

function getPlatformIcon(url: string) {
  try {
    const host = new URL(url).hostname.replace('www.', '');
    const platform = Object.keys(iconMap).find((key) => host.includes(key.toLowerCase()));
    const Icon = iconMap[platform || ''];
    return Icon ? <Icon size={18} /> : <Link2 size={18} />;
  } catch {
    return <Link2 size={18} />;
  }
}

const SocialsUpdate = ({ profile }: { profile: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {profile.socials.length > 0 ? (
        <div className="flex flex-col gap-2 px-4">
          {profile.socials.map((social: any, index: number) => {
            const Icon = getPlatformIcon(social.url);
            return (
              <div
                className="flex items-center justify-between gap-4 bg-muted py-2 px-4 rounded-md"
                key={index}
              >
                {/* Left side: Icon + URL */}
                <div className="flex justify-center items-center gap-2">
                  <div className="text-foreground/60">{Icon}</div>
                  <p className="text-sm font-medium max-w-36 md:max-w-fit truncate">{social.url}</p>
                </div>

                {/* Right side: Edit + Trash icons */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => setOpen(true)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center bg-muted/40 rounded-2xl p-6 shadow-sm h-[300px] border border-dashed border-border transition-colors">
          <Globe size={64} className="text-muted-foreground mb-4 opacity-60 " />
          <h1 className="text-lg font-semibold text-muted-foreground mb-2 opacity-60 ">No socials added yet</h1>
          <p className="text-sm text-muted-foreground mb-4 max-w-xs opacity-60 ">
            You haven't added any social links to your profile yet.
          </p>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex items-center gap-2 opacity-100"
          >
            <Plus className="w-4 h-4" />
            Add Socials
          </Button>
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[70vh] overflow-y-auto scrollbar-hidden no_scrollbar">
          <DialogHeader className="mb-4">
            <DialogTitle>Add/Edit Socials</DialogTitle>
          </DialogHeader>
          <SocialsForm profile={profile} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialsUpdate;
