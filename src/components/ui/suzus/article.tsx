import React from 'react'

type ArticlesProps = {
  breakpoint?: string;
  image: boolean;
  video: boolean;
};



const Articles: React.FC<ArticlesProps> = ({ breakpoint, video, image }) => {
  const renderContent = () => {
    switch (breakpoint) {
      case 'Desktop':
        return (
          <div className='py-[10px] flex pt-4 flex-col items-start gap-2.5 self-stretch rounded-20 bg-white   '>
            {/* header */}
            <div className='mt-4 mb-2.5 flex px-4 justify-between items-start self-stretch '>
              {/* row 1 */}
              <div className='ml-4 flex items-center gap-2 flex-grow flex-shrink-0 basis-0  '>
                {/* avatar */}
                <div></div>
                {/* text */}
                <div className='text-slate-900 font-openSans text-15 not-italic font-semibold leading-22.5  '>
                  camkhuc.99
                </div>
              </div>
              {/* row 2 */}
              <div className='mr-4 flex items-center gap-2  '>
                <div className='text-slate-500 font-openSans text-15 not-italic font-normal leading-24  '>
                  1 ngày
                </div>
                <div className='mr-4 flex px-2 flex-col items-start'>
                  <div className='mx-2 p-2 flex h-[40px] flex-col items-start gap-1 rounded-999 '>
                    <div className='p-2 flex items-start gap-2 rounded-999 '>
                      {/* thieu button phai lam lai */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* content */}
            <div className='px-4 my-2.5 flex flex-col items-start self-stretch '>
              <p className='self-stretch overflow-hidden text-slate-900 text-ellipsis font-openSans text-18 not-italic font-normal leading-23.4 flex flex-col min-h-0 flex-grow ' style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}>
                Leo quis ultrices amet in eget amet gravida. Nunc id ut egestas condimentum. Integer vitae orci mau in eget amet gravida.</p>
            </div>
            {/* label */}
            <div className='my-2.5 px-4 flex items-start gap-2 self-stretch '>
              <div className='ml-4 mr-2 flex items-start gap-1'>
                <div className='text-slate-500 font-openSans text-15 not-italic font-normal leading-22.5 '>
                  99 tương tác
                </div>
              </div>
              <div className='text-slate-500 font-openSans text-15 not-italic font-normal leading-22.5 '>
                ·
              </div>
              <div className='ml-2 mr-4 flex items-start gap-1'>
                <div className='text-slate-500 font-openSans text-15 not-italic font-normal leading-22.5 '>
                  99 thảo luận
                </div>
              </div>
            </div>
          </div>
        );
      case 'Tablet':
        // Return JSX for Tablet
        return <div>Tablet view</div>;
      case 'Mobile':
        // Return JSX for Mobile
        return <div>Mobile view</div>;
      default:
        return <></>;
    }
  };
  return (
    <>
      {renderContent()}
    </>
  )
}


export default Articles