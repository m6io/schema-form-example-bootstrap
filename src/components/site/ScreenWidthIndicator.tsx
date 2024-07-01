export function ScreenWidthIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed-bottom start-0 m-1 p-1 d-flex align-items-center justify-content-center rounded-circle bg-dark text-white">
      <div className="d-block d-sm-none">xs</div>
      <div className="d-none d-sm-block d-md-none">sm</div>
      <div className="d-none d-md-block d-lg-none">md</div>
      <div className="d-none d-lg-block d-xl-none">lg</div>
      <div className="d-none d-xl-block d-xxl-none">xl</div>
      <div className="d-none d-xxl-block">2xl</div>
    </div>
  );
}
