import React, { useState } from 'react';
import axios from 'axios';

const EmployeeProjects = () => {
    const [employees, setEmployees] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpload = async () => {
        try {
            setLoading(true);
            setError(null);
            const employeesArray = JSON.parse(employees);
            const response = await axios.put('https://localhost:7171/api/FileRecords', employeesArray);
            setResult(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFetch = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('https://localhost:7171/api/EmployeeProject');
            setResult(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    console.log(JSON.stringify(result, null, 2))

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Projects</h1>
            <div style={{ marginBottom: '20px' }}>
                <textarea
                    rows="10"
                    cols="50"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                    placeholder='Enter employee projects JSON here...'
                    style={{ padding: '10px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={handleUpload} disabled={loading} style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Upload Employees
                </button>
                <button onClick={handleFetch} disabled={loading} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Fetch Longest Working Pair
                </button>
            </div>
            {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
            {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
            {result && (
                <div style={{ marginTop: '20px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Longest Working Pair</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Employee ID #1</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Employee ID #2</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Project ID</th>
                                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>Total Days Worked Together</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{result.firstEmployeeId}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{result.secondEmployeeId}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{result.projectId}</td>
                                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{result.daysWorkedTogether}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeProjects;