export default function ({ title, children, maxWidth = 34, open, onClose }) {
  return (
    <>
      {open && (
        <>
          <div className={`fixed inset-0 bg-black opacity-45 z-45`}></div>
          <div className="fixed inset-0 z-30">
            <div className="flex justify-center items-center min-h-full">
              <div
                className="bg-white text-black rounded-lg w-full shadow-md shadow-white"
                style={{ maxWidth: `${maxWidth}rem` }}
              >
                <div className="flex justify-between p-4 text-xl">
                  <div className="text-white cursor-default">x</div>
                  <div className="font-bold text-3xl cursor-default">
                    {title}
                  </div>
                  <div
                    className="text-gray-500 cursor-default"
                    onClick={onClose}
                  >
                    X
                  </div>
                </div>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// design
// <Model title="Sign up">
// <RegisterForm />
// </Model>
