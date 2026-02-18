"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils"; // Assuming a utility exists, else I'll add a simple one

export function DatePicker({
    date,
    setDate,
    className
}: {
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    className?: string;
}) {
    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button
                    className={cn(
                        "w-full flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-muted text-left text-sm font-normal focus:outline-none focus:ring-2 focus:ring-ring transition-colors",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="w-4 h-4" />
                    {date ? format(date, "PPP p") : <span>Pick a deadline</span>}
                </button>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    className="z-50 w-auto p-4 rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
                    align="start"
                >
                    <div className="flex flex-col gap-4">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                                if (!newDate) {
                                    setDate(undefined);
                                    return;
                                }
                                const updatedDate = new Date(newDate);
                                if (date) {
                                    updatedDate.setHours(date.getHours(), date.getMinutes());
                                } else {
                                    // Default to current time or 1 hour from now if it's today
                                    const now = new Date();
                                    updatedDate.setHours(now.getHours() + 1, now.getMinutes());
                                }
                                setDate(updatedDate);
                            }}
                            initialFocus
                            disabled={{ before: new Date() }}
                            classNames={{
                                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                                month: "space-y-4",
                                caption: "flex justify-center pt-1 relative items-center mb-4",
                                caption_label: "text-sm font-medium text-foreground",
                                nav: "space-x-1 flex items-center",
                                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md border border-border",
                                nav_button_previous: "absolute left-1",
                                nav_button_next: "absolute right-1",
                                table: "w-full border-collapse space-y-1",
                                head_row: "flex",
                                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                                row: "flex w-full mt-2",
                                cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors",
                                day_selected: "bg-foreground text-background hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background rounded-lg",
                                day_today: "bg-accent/50 text-accent-foreground rounded-lg",
                                day_outside: "text-muted-foreground opacity-50",
                                day_disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
                                day_hidden: "invisible",
                            }}
                        />
                        <div className="flex items-center gap-3 pt-4 border-t border-border">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div className="flex-1 flex items-center gap-2">
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Time:</span>
                                <input
                                    type="time"
                                    className="flex-1 bg-muted rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring border border-border"
                                    value={date ? format(date, "HH:mm") : ""}
                                    onChange={(e) => {
                                        if (!e.target.value) return;
                                        const [hours, minutes] = e.target.value.split(":").map(Number);
                                        const newDate = date ? new Date(date) : new Date();
                                        newDate.setHours(hours, minutes, 0, 0);
                                        setDate(newDate);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
