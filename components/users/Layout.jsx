export { Layout };

function Layout({ children }) {
    return (
        <div className="p-0">
            <div className="container-fluid">
                {children}
            </div>
        </div>
    );
}