import Lane from './models/lane';

export default function () {
  Lane.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const lane1 = new Lane({ id: '5a9caa6c-576b-405d-bac4-a2cf43bff034', name: 'To do', notes: [], order: 0 });
    const lane2 = new Lane({ id: '5a9caa6c-576b-405d-bac4-a2cf43bff035', name: 'Doing', notes: [], order: 1 });
    const lane3 = new Lane({ id: '5a9caa6c-576b-405d-bac4-a2cf43bff036', name: 'Testing', notes: [], order: 2 });
    const lane4 = new Lane({ id: '5a9caa6c-576b-405d-bac4-a2cf43bff037', name: 'Done', notes: [], order: 3 });

    Lane.create([lane1, lane2, lane3, lane4 ], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
