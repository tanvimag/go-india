import React from 'react';
import { Link } from 'react-router-dom';

export default function VlogCard({ vlog }){
  return (
    <div className="border rounded p-3">
      <Link to={`/v/${vlog._id}`}>
        <div className="h-44 bg-gray-200 flex items-center justify-center">
          {/* placeholder thumbnail */}
          {vlog.thumbnail ? <img src={vlog.thumbnail} alt="" className="h-full w-full object-cover" /> : <span className="text-gray-600">Video</span>}
        </div>
        <h3 className="font-semibold mt-2">{vlog.title}</h3>
        <p className="text-sm text-gray-600">{vlog.description?.slice(0,100)}</p>
      </Link>
    </div>
  );
}
