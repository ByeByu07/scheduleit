import React, { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sun, Grid } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarProps {
  events: Event[];
  onEventDrop?: (event: { event: Event; start: Date; end: Date }) => void; // Update type here
  onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
  selectable: boolean;
}

export default function Calendar({ events, onEventDrop, onSelectSlot, selectable }: CalendarProps) {
  const [view, setView] = useState<View>('month');

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    onSelectSlot(slotInfo);
  };

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-lg p-2 sm:p-6">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        className="custom-calendar"
        selectable={selectable}
        onSelectSlot={handleSelectSlot}
        views={['month', 'day']}
        view={view}
        onView={setView}
        defaultView="month"
        components={{
          dateCellWrapper: (props) => (
            <div
              {...props}
              className="relative cursor-pointer hover:bg-blue-50 transition-colors duration-200"
              style={{ touchAction: 'manipulation' }}
            />
          ),
          toolbar: (toolbarProps) => (
            <div className="rbc-toolbar flex flex-col gap-4 p-3 bg-white shadow-sm rounded-t-lg">
              {/* Mobile Layout */}
              <div className="sm:hidden flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-blue-500" />
                    {toolbarProps.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toolbarProps.onNavigate('TODAY')}
                      className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200"
                      title="Today"
                    >
                      <CalendarIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => toolbarProps.onNavigate('PREV')}
                      className="flex-1 p-3 rounded-lg hover:bg-white transition-all duration-200 text-gray-600"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => toolbarProps.onNavigate('NEXT')}
                      className="flex-1 p-3 rounded-lg hover:bg-white transition-all duration-200 text-gray-600"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => toolbarProps.onView('month')}
                      className={`flex-1 p-3 rounded-lg transition-all duration-200
                        ${view === 'month' 
                          ? 'bg-white text-blue-500 shadow-sm' 
                          : 'text-gray-600 hover:bg-white/50'
                        }`}
                      title="Month view"
                    >
                      <Grid className="w-5 h-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => toolbarProps.onView('day')}
                      className={`flex-1 p-3 rounded-lg transition-all duration-200
                        ${view === 'day' 
                          ? 'bg-white text-blue-500 shadow-sm' 
                          : 'text-gray-600 hover:bg-white/50'
                        }`}
                      title="Day view"
                    >
                      <Sun className="w-5 h-5 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden sm:flex justify-between items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => toolbarProps.onNavigate('PREV')}
                      className="p-2 rounded-lg hover:bg-white transition-all duration-200 text-gray-600 flex items-center gap-1"
                      title="Previous"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span className="sr-only">Previous</span>
                    </button>
                    <button
                      onClick={() => toolbarProps.onNavigate('NEXT')}
                      className="p-2 rounded-lg hover:bg-white transition-all duration-200 text-gray-600 flex items-center gap-1"
                      title="Next"
                    >
                      <ChevronRight className="w-5 h-5" />
                      <span className="sr-only">Next</span>
                    </button>
                  </div>
                  <button
                    onClick={() => toolbarProps.onNavigate('TODAY')}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    Today
                  </button>
                </div>
                <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 text-blue-500" />
                  {toolbarProps.label}
                </span>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => toolbarProps.onView('month')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2
                      ${view === 'month' 
                        ? 'bg-white text-blue-500 shadow-sm' 
                        : 'text-gray-600 hover:bg-white/50'
                      }`}
                    title="Month view"
                  >
                    <Grid className="w-4 h-4" />
                    <span>Month</span>
                  </button>
                  <button
                    onClick={() => toolbarProps.onView('day')}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center gap-2
                      ${view === 'day' 
                        ? 'bg-white text-blue-500 shadow-sm' 
                        : 'text-gray-600 hover:bg-white/50'
                      }`}
                    title="Day view"
                  >
                    <Sun className="w-4 h-4" />
                    <span>Day</span>
                  </button>
                </div>
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
}
